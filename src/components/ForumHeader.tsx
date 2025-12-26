import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type UserRole = 'user' | 'moderator' | 'admin';

interface ForumHeaderProps {
  activeSection: 'news' | 'discussions' | 'chat' | 'contacts';
  setActiveSection: (section: 'news' | 'discussions' | 'chat' | 'contacts') => void;
  isAuthenticated: boolean;
  userRole: UserRole;
  selectedBorder: { id: number; name: string; gradient: string; color: string };
  setSelectedBorder: (border: { id: number; name: string; gradient: string; color: string }) => void;
  handleAuth: (role?: UserRole) => void;
  achievements: Array<{ id: number; name: string; icon: string; unlocked: boolean; description: string }>;
  avatarBorders: Array<{ id: number; name: string; gradient: string; color: string }>;
}

export default function ForumHeader({
  activeSection,
  setActiveSection,
  isAuthenticated,
  userRole,
  selectedBorder,
  setSelectedBorder,
  handleAuth,
  achievements,
  avatarBorders,
}: ForumHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-gradient-to-r from-red-500 to-orange-500"><Icon name="Crown" size={12} className="mr-1" />Администратор</Badge>;
      case 'moderator':
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500"><Icon name="Shield" size={12} className="mr-1" />Модератор</Badge>;
      default:
        return <Badge variant="secondary"><Icon name="User" size={12} className="mr-1" />Пользователь</Badge>;
    }
  };

  return (
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
              variant={activeSection === 'news' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('news')}
              className="gap-2"
            >
              <Icon name="Newspaper" size={18} />
              Новости
            </Button>
            <Button
              variant={activeSection === 'discussions' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('discussions')}
              className="gap-2"
            >
              <Icon name="MessageCircle" size={18} />
              Обсуждения
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
              <>
                {(userRole === 'admin' || userRole === 'moderator') && (
                  <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Icon name="Settings" size={16} />
                        Управление
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Управление пользователями</DialogTitle>
                        <DialogDescription>Назначайте роли участникам форума</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-muted">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                                <AvatarFallback>А</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">Алексей</p>
                                <p className="text-xs text-muted-foreground">127 постов</p>
                              </div>
                            </div>
                            <Select defaultValue="user">
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">Пользователь</SelectItem>
                                <SelectItem value="moderator">Модератор</SelectItem>
                                {userRole === 'admin' && <SelectItem value="admin">Администратор</SelectItem>}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" />
                                <AvatarFallback>М</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">Мария</p>
                                <p className="text-xs text-muted-foreground">93 поста</p>
                              </div>
                            </div>
                            <Select defaultValue="moderator">
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">Пользователь</SelectItem>
                                <SelectItem value="moderator">Модератор</SelectItem>
                                {userRole === 'admin' && <SelectItem value="admin">Администратор</SelectItem>}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative animate-pulse-glow">
                      <Avatar className="w-9 h-9 border-4" style={{ borderImage: selectedBorder.gradient, borderImageSlice: 1 }}>
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
                          <Avatar className="w-24 h-24 border-4 animate-pulse-glow" style={{ borderImage: selectedBorder.gradient, borderImageSlice: 1 }}>
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
                            {getRoleBadge(userRole)}
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
                          Достижения ({achievements.filter(a => a.unlocked).length}/{achievements.length})
                        </h4>
                        <div className="grid grid-cols-4 gap-3">
                          {achievements.map((achievement) => (
                            <div
                              key={achievement.id}
                              className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                                achievement.unlocked
                                  ? 'bg-primary/10 border-primary hover:scale-105'
                                  : 'bg-muted/50 border-muted opacity-50'
                              }`}
                              title={achievement.description}
                            >
                              <Icon name={achievement.icon as any} size={24} className="mx-auto mb-1" />
                              <p className="text-xs font-medium">{achievement.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Icon name="Palette" size={18} />
                          Рамка аватара
                        </h4>
                        <div className="grid grid-cols-4 gap-3">
                          {avatarBorders.map((border) => (
                            <button
                              key={border.id}
                              onClick={() => setSelectedBorder(border)}
                              className={`p-3 rounded-lg border-2 hover:scale-105 transition-transform ${
                                selectedBorder.id === border.id ? 'ring-2 ring-primary' : ''
                              }`}
                              style={{ background: border.gradient }}
                              title={border.name}
                            >
                              <div className="w-full h-12 rounded-full bg-background/80 flex items-center justify-center">
                                <Icon name="User" size={20} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
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
                      onClick={() => handleAuth('user')}
                      className="w-full gap-2 bg-red-600 hover:bg-red-700"
                    >
                      <Icon name="Mail" size={18} />
                      Войти через Яндекс
                    </Button>
                    <Button
                      onClick={() => handleAuth('user')}
                      className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Icon name="Mail" size={18} />
                      Войти через Google
                    </Button>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-xs text-center text-muted-foreground mb-2">
                        Режим демонстрации - выберите роль:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleAuth('user')}>Пользователь</Button>
                        <Button variant="outline" size="sm" onClick={() => handleAuth('moderator')}>Модератор</Button>
                        <Button variant="outline" size="sm" onClick={() => handleAuth('admin')}>Админ</Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
