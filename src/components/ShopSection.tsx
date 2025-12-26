import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { mockBackgrounds, mockBorders, mockGiftBoxes, mockCards } from '@/data/mockData';

interface ShopSectionProps {
  userCoins: number;
  onPurchase: (price: number) => void;
}

export default function ShopSection({ userCoins, onPurchase }: ShopSectionProps) {
  const [openedBox, setOpenedBox] = useState<string | null>(null);

  const handlePurchase = (price: number) => {
    if (userCoins >= price) {
      onPurchase(price);
    }
  };

  const handleOpenBox = (boxId: string, price: number) => {
    if (userCoins >= price) {
      onPurchase(price);
      setOpenedBox(boxId);
      setTimeout(() => setOpenedBox(null), 3000);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-amber-500 to-yellow-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border-violet-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl flex items-center gap-3">
                <Icon name="ShoppingBag" size={32} />
                Магазин
              </CardTitle>
              <CardDescription>Покупайте уникальные предметы за монеты</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Icon name="Coins" size={28} className="text-amber-500" />
              {userCoins}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="boxes">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="boxes">Боксы</TabsTrigger>
              <TabsTrigger value="backgrounds">Фоны</TabsTrigger>
              <TabsTrigger value="borders">Рамки</TabsTrigger>
              <TabsTrigger value="cards">Карточки</TabsTrigger>
            </TabsList>

            <TabsContent value="boxes" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {mockGiftBoxes.map((box) => (
                  <Card key={box.id} className="relative overflow-hidden border-2 hover:border-primary transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5" />
                    <CardContent className="p-6 relative">
                      <div className="text-6xl text-center mb-4">{box.image}</div>
                      <h3 className="text-xl font-bold text-center mb-2">{box.name}</h3>
                      <div className="space-y-2 mb-4">
                        {box.rewards.map((reward, i) => (
                          <div key={i} className="text-sm text-muted-foreground flex justify-between">
                            <span>{reward.type === 'coins' ? 'Монеты' : reward.type === 'card' ? 'Карточка' : reward.type === 'background' ? 'Фон' : 'Рамка'}</span>
                            <span>{reward.chance}%</span>
                          </div>
                        ))}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full gap-2"
                            disabled={userCoins < box.price}
                          >
                            <Icon name="ShoppingCart" size={18} />
                            {box.price} <Icon name="Coins" size={16} className="text-amber-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Открыть {box.name}?</DialogTitle>
                            <DialogDescription>
                              Вы получите случайный предмет из этого бокса
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="text-6xl text-center animate-pulse">{box.image}</div>
                            <Button
                              onClick={() => handleOpenBox(box.id, box.price)}
                              className="w-full"
                            >
                              Открыть за {box.price} монет
                            </Button>
                            {openedBox === box.id && (
                              <div className="text-center p-4 rounded-lg bg-primary/20 animate-fade-in">
                                <p className="text-lg font-bold">🎉 Вы получили: +100 монет!</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backgrounds" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {mockBackgrounds.map((bg) => (
                  <Card key={bg.id} className="overflow-hidden border-2 hover:border-primary transition-all">
                    <div className="h-32" style={{ background: bg.gradient }} />
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold">{bg.name}</h3>
                        {bg.isExclusive && <Badge variant="secondary">Эксклюзив</Badge>}
                      </div>
                      <Button
                        onClick={() => handlePurchase(bg.price)}
                        disabled={userCoins < bg.price || bg.price === 0}
                        className="w-full gap-2"
                      >
                        {bg.price === 0 ? 'Бесплатно' : (
                          <>
                            {bg.price} <Icon name="Coins" size={16} className="text-amber-500" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="borders" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-4 gap-4">
                {mockBorders.map((border) => (
                  <Card key={border.id} className="overflow-hidden border-2 hover:border-primary transition-all">
                    <CardContent className="p-4">
                      <div
                        className="w-full h-24 rounded-lg mb-3"
                        style={{ background: border.gradient }}
                      />
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-sm">{border.name}</h3>
                        {border.isExclusive && <Badge variant="secondary" className="text-xs">VIP</Badge>}
                      </div>
                      <Button
                        onClick={() => handlePurchase(border.price)}
                        disabled={userCoins < border.price || border.price === 0}
                        size="sm"
                        className="w-full gap-2"
                      >
                        {border.price === 0 ? 'Бесплатно' : (
                          <>
                            {border.price} <Icon name="Coins" size={14} className="text-amber-500" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cards" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-4 gap-4">
                {mockCards.map((card) => (
                  <Card key={card.id} className={`overflow-hidden border-2 bg-gradient-to-br ${getRarityColor(card.rarity)}`}>
                    <CardContent className="p-4 text-white">
                      <div className="text-5xl text-center mb-3">{card.image}</div>
                      <h3 className="font-bold text-center mb-2">{card.name}</h3>
                      <Badge variant="secondary" className="w-full justify-center mb-3">
                        {card.rarity.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-center opacity-90">{card.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-center text-muted-foreground text-sm">
                Карточки можно получить только из боксов
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
