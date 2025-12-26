import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const categories = [
  { id: 'bloggers', name: 'Блогеры', icon: 'Video', color: 'from-pink-500 to-rose-500', posts: 234 },
  { id: 'crypto', name: 'Криптовалюта', icon: 'TrendingUp', color: 'from-orange-500 to-amber-500', posts: 567 },
  { id: 'finance', name: 'Финансы и банки', icon: 'Wallet', color: 'from-blue-500 to-cyan-500', posts: 432 },
  { id: 'news', name: 'Ежедневные новости', icon: 'Newspaper', color: 'from-purple-500 to-indigo-500', posts: 891 },
];

const mockPosts = [
  {
    id: 1,
    title: 'Новые тренды в блогинге 2025',
    author: 'Алексей',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    category: 'bloggers',
    replies: 23,
    views: 456,
    timestamp: '2 часа назад',
    isPinned: true,
  },
  {
    id: 2,
    title: 'Bitcoin достиг новых высот',
    author: 'Мария',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    category: 'crypto',
    replies: 87,
    views: 1234,
    timestamp: '4 часа назад',
    isPinned: false,
  },
  {
    id: 3,
    title: 'Как выбрать выгодный вклад',
    author: 'Дмитрий',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
    category: 'finance',
    replies: 45,
    views: 789,
    timestamp: '6 часов назад',
    isPinned: false,
  },
];

const achievements = [
  { id: 1, name: 'Первый пост', icon: 'Award', unlocked: true },
  { id: 2, name: 'Популярный автор', icon: 'Star', unlocked: true },
  { id: 3, name: 'Модератор', icon: 'Shield', unlocked: false },
  { id: 4, name: 'Легенда форума', icon: 'Crown', unlocked: false },
];

function Index() {
  const [activeSection, setActiveSection] = useState<'discussions' | 'news' | 'chat' | 'contacts'>('discussions');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(true);
    setIsAuthOpen(false);
  };

  const filteredPosts = selectedCategory
    ? mockPosts.filter(post => post.category === selectedCategory)
    : mockPosts;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="MessageSquare" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ForumHub
                </h1>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant={activeSection === 'discussions' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('discussions')}
                className="gap-2"
              >
                <Icon name="MessageCircle" size={18} />
                Обсуждения
              </Button>
              <Button
                variant={activeSection === 'news' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('news')}
                className="gap-2"
              >
                <Icon name="Newspaper" size={18} />
                Новости
              </Button>
              <Button
                variant={activeSection === 'chat' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('chat')}
                className="gap-2"
              >
                <Icon name="MessagesSquare" size={18} />
                Чат
              </Button>
              <Button
                variant={activeSection === 'contacts' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('contacts')}
                className="gap-2"
              >
                <Icon name="Mail" size={18} />
                Контакты
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative animate-pulse-glow">
                      <Avatar className="w-9 h-9 border-2 border-primary">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                        <AvatarFallback>Я</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Мой профиль</DialogTitle>
                      <DialogDescription>Управляйте своим профилем и достижениями</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex items-start gap-6">
                        <div className="relative">
                          <Avatar className="w-24 h-24 border-4 border-primary animate-pulse-glow">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                            <AvatarFallback>Я</AvatarFallback>
                          </Avatar>
                          <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8">
                            <Icon name="Camera" size={16} />
                          </Button>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="text-xl font-bold">Пользователь</h3>
                            <Badge variant="secondary" className="mt-1">
                              <Icon name="Zap" size={14} className="mr-1" />
                              Активный участник
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="MessageSquare" size={16} />
                              <span>127 постов</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="ThumbsUp" size={16} />
                              <span>1.2k лайков</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Trophy" size={16} />
                              <span>Рейтинг: 4580</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Icon name="Award" size={18} />
                          Достижения
                        </h4>
                        <div className="grid grid-cols-4 gap-3">
                          {achievements.map((achievement) => (
                            <div
                              key={achievement.id}
                              className={`p-3 rounded-lg border text-center transition-all ${
                                achievement.unlocked
                                  ? 'bg-primary/10 border-primary'
                                  : 'bg-muted/50 border-muted opacity-50'
                              }`}
                            >
                              <Icon name={achievement.icon as any} size={24} className="mx-auto mb-1" />
                              <p className="text-xs font-medium">{achievement.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-3">Настройки рамки</h4>
                        <div className="grid grid-cols-5 gap-2">
                          {['primary', 'secondary', 'accent', 'destructive', 'muted'].map((color) => (
                            <button
                              key={color}
                              className={`w-full h-12 rounded-lg border-4 hover:scale-110 transition-transform`}
                              style={{
                                borderColor: `hsl(var(--${color}))`
                              }}
                              title={`Рамка ${color}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="LogIn" size={18} />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Авторизация</DialogTitle>
                      <DialogDescription>Войдите через один из сервисов</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      <Button
                        onClick={handleAuth}
                        className="w-full gap-2 bg-red-600 hover:bg-red-700"
                      >
                        <Icon name="Mail" size={18} />
                        Войти через Яндекс
                      </Button>
                      <Button
                        onClick={handleAuth}
                        className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                      >
                        <Icon name="Mail" size={18} />
                        Войти через Google
                      </Button>
                      <Separator />
                      <p className="text-xs text-center text-muted-foreground">
                        Нажимая кнопку входа, вы соглашаетесь с правилами форума
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'discussions' && (
          <div className="grid lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1 space-y-4">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-primary/20 to-secondary/20">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Layers" size={20} />
                    Категории
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full p-4 text-left hover:bg-accent/50 transition-colors ${
                        !selectedCategory ? 'bg-accent/30' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Все темы</span>
                        <Badge variant="secondary">{mockPosts.length}</Badge>
                      </div>
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full p-4 text-left hover:bg-accent/50 transition-colors ${
                          selectedCategory === category.id ? 'bg-accent/30' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                              <Icon name={category.icon as any} size={16} className="text-white" />
                            </div>
                            <span className="font-medium">{category.name}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground ml-10">
                          {category.posts} обсуждений
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Icon name="Info" size={16} />
                    Правила форума
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2 text-muted-foreground">
                  <p>• Уважайте других участников</p>
                  <p>• Не публикуйте спам</p>
                  <p>• Проверяйте факты</p>
                  <p>• Соблюдайте тему обсуждения</p>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {selectedCategory
                    ? categories.find(c => c.id === selectedCategory)?.name
                    : 'Все обсуждения'}
                </h2>
                {isAuthenticated && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-gradient-to-r from-primary to-secondary">
                        <Icon name="Plus" size={18} />
                        Создать тему
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новая тема</DialogTitle>
                        <DialogDescription>Создайте новое обсуждение</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Заголовок</label>
                          <Input placeholder="О чём будет обсуждение?" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Сообщение</label>
                          <Textarea placeholder="Расскажите подробнее..." rows={6} />
                        </div>
                        <Button className="w-full">Опубликовать</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-3">
                  {filteredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer animate-fade-in"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12 border-2 border-primary/20">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  {post.isPinned && (
                                    <Icon name="Pin" size={14} className="text-accent" />
                                  )}
                                  <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                                    {post.title}
                                  </h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {post.author} • {post.timestamp}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Icon name="MessageSquare" size={16} />
                                <span>{post.replies}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Eye" size={16} />
                                <span>{post.views}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.id === post.category)?.name}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}

        {activeSection === 'news' && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="Newspaper" size={32} />
                  Новости
                </CardTitle>
                <CardDescription>Последние события и анонсы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h3 className="font-bold text-xl mb-2">Обновление платформы</h3>
                  <p className="text-muted-foreground mb-3">
                    Мы добавили новые функции модерации и систему достижений для всех пользователей!
                  </p>
                  <p className="text-xs text-muted-foreground">26 декабря 2025</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="MessagesSquare" size={32} />
                  Чат
                </CardTitle>
                <CardDescription>Общайтесь в реальном времени</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Функция чата появится в ближайшее время</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="Mail" size={32} />
                  Контакты
                </CardTitle>
                <CardDescription>Свяжитесь с администрацией</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <Icon name="Mail" size={24} className="mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">support@forumhub.ru</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <Icon name="MessageCircle" size={24} className="mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">Telegram</h4>
                    <p className="text-sm text-muted-foreground">@forumhub_support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

export default Index;
