import { useState, useRef, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    isNews: false,
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
    isNews: false,
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
    isNews: false,
  },
];

const mockNews = [
  {
    id: 101,
    title: 'Обновление платформы ForumHub 2.0',
    content: 'Мы добавили новые функции модерации, систему достижений и улучшенный чат для всех пользователей!',
    author: 'Администрация',
    category: 'news',
    timestamp: '26 декабря 2025',
  },
  {
    id: 102,
    title: 'Новые правила публикации контента',
    content: 'С сегодняшнего дня вводятся обновленные правила модерации и публикации материалов.',
    author: 'Администрация',
    category: 'news',
    timestamp: '25 декабря 2025',
  },
];

const achievements = [
  { id: 1, name: 'Первый пост', icon: 'Award', unlocked: true, description: 'Создайте свой первый пост' },
  { id: 2, name: 'Популярный автор', icon: 'Star', unlocked: true, description: '100+ лайков' },
  { id: 3, name: 'Модератор', icon: 'Shield', unlocked: false, description: 'Станьте модератором' },
  { id: 4, name: 'Легенда форума', icon: 'Crown', unlocked: false, description: '1000+ постов' },
  { id: 5, name: 'Активист', icon: 'Flame', unlocked: true, description: '30 дней подряд' },
  { id: 6, name: 'Эксперт', icon: 'GraduationCap', unlocked: false, description: '500+ ответов' },
  { id: 7, name: 'Первооткрыватель', icon: 'Compass', unlocked: true, description: 'Первый месяц на форуме' },
  { id: 8, name: 'Благодетель', icon: 'Heart', unlocked: false, description: 'Помогите 50 пользователям' },
];

const avatarBorders = [
  { id: 1, name: 'Фиолетовый', gradient: 'linear-gradient(135deg, #8B5CF6, #D946EF)', color: '#8B5CF6' },
  { id: 2, name: 'Огненный', gradient: 'linear-gradient(135deg, #F97316, #EF4444)', color: '#F97316' },
  { id: 3, name: 'Океан', gradient: 'linear-gradient(135deg, #0EA5E9, #06B6D4)', color: '#0EA5E9' },
  { id: 4, name: 'Золотой', gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)', color: '#F59E0B' },
  { id: 5, name: 'Изумруд', gradient: 'linear-gradient(135deg, #10B981, #14B8A6)', color: '#10B981' },
  { id: 6, name: 'Рассвет', gradient: 'linear-gradient(135deg, #EC4899, #F97316)', color: '#EC4899' },
  { id: 7, name: 'Галактика', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6, #D946EF)', color: '#6366F1' },
  { id: 8, name: 'Неон', gradient: 'linear-gradient(135deg, #22D3EE, #A855F7)', color: '#22D3EE' },
];

const mockChatMessages = [
  { id: 1, author: 'Алексей', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', text: 'Привет всем! Как дела?', timestamp: '10:30' },
  { id: 2, author: 'Мария', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', text: 'Отлично! Обсуждаем новый тренд в крипте', timestamp: '10:32' },
  { id: 3, author: 'Дмитрий', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', text: 'Кто-нибудь может посоветовать хороший банк?', timestamp: '10:35' },
];

type UserRole = 'user' | 'moderator' | 'admin';

function Index() {
  const [activeSection, setActiveSection] = useState<'news' | 'discussions' | 'chat' | 'contacts'>('news');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedBorder, setSelectedBorder] = useState(avatarBorders[0]);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleAuth = (role: UserRole = 'user') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setIsAuthOpen(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && isAuthenticated) {
      const message = {
        id: chatMessages.length + 1,
        author: 'Вы',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const filteredPosts = selectedCategory
    ? mockPosts.filter(post => post.category === selectedCategory)
    : mockPosts;

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

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'news' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Icon name="Newspaper" size={32} />
                  Новости
                </h2>
                <p className="text-muted-foreground mt-1">Последние события и анонсы</p>
              </div>
              {userRole === 'admin' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-gradient-to-r from-primary to-secondary">
                      <Icon name="Plus" size={18} />
                      Опубликовать новость
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Новая новость</DialogTitle>
                      <DialogDescription>Создайте объявление для всех пользователей</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Заголовок</label>
                        <Input placeholder="Важное объявление..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Категория</label>
                        <Select defaultValue="news">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="news">Ежедневные новости</SelectItem>
                            <SelectItem value="bloggers">Блогеры</SelectItem>
                            <SelectItem value="crypto">Криптовалюта</SelectItem>
                            <SelectItem value="finance">Финансы и банки</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Содержание</label>
                        <Textarea placeholder="Текст новости..." rows={6} />
                      </div>
                      <Button className="w-full">Опубликовать</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            
            <div className="space-y-3">
              {mockNews.map((news) => (
                <Card key={news.id} className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Icon name="Megaphone" size={24} className="text-primary mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-2">{news.title}</h3>
                        <p className="text-muted-foreground mb-3">{news.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="User" size={14} />
                            {news.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {news.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

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
                          <label className="text-sm font-medium mb-2 block">Категория</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.filter(c => c.id !== 'news').map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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

        {activeSection === 'chat' && (
          <div className="max-w-4xl mx-auto">
            {isAuthenticated ? (
              <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <Icon name="MessagesSquare" size={32} />
                    Общий чат
                  </CardTitle>
                  <CardDescription>Обсуждайте темы в реальном времени</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ScrollArea className="h-[400px] rounded-lg border border-border bg-card/50 p-4" ref={chatScrollRef}>
                      <div className="space-y-4">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className="flex items-start gap-3 animate-fade-in">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={msg.avatar} />
                              <AvatarFallback>{msg.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{msg.author}</span>
                                <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                              </div>
                              <p className="text-sm bg-muted px-3 py-2 rounded-lg inline-block">
                                {msg.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Введите сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} className="gap-2">
                        <Icon name="Send" size={18} />
                        Отправить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <Icon name="MessagesSquare" size={32} />
                    Чат
                  </CardTitle>
                  <CardDescription>Общайтесь в реальном времени</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Icon name="Lock" size={48} className="mx-auto mb-4 opacity-50 text-muted-foreground" />
                    <p className="text-lg font-semibold mb-2">Чат доступен только авторизованным пользователям</p>
                    <p className="text-muted-foreground mb-4">Войдите в систему, чтобы начать общение</p>
                    <Button onClick={() => setIsAuthOpen(true)} className="gap-2">
                      <Icon name="LogIn" size={18} />
                      Войти
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
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
