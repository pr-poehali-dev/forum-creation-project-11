import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ForumHeader from '@/components/ForumHeader';
import NewsSection from '@/components/NewsSection';
import DiscussionsSection from '@/components/DiscussionsSection';
import ChatSection from '@/components/ChatSection';
import PrivateMessagesSection from '@/components/PrivateMessagesSection';
import ShopSection from '@/components/ShopSection';
import QuestsSection from '@/components/QuestsSection';
import { Quest } from '@/types/forum';
import { mockQuests } from '@/data/mockData';

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
  const [activeSection, setActiveSection] = useState<'news' | 'discussions' | 'chat' | 'messages' | 'shop' | 'quests' | 'contacts'>('news');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedBorder, setSelectedBorder] = useState(avatarBorders[0]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userCoins, setUserCoins] = useState(500);
  const [quests, setQuests] = useState<Quest[]>(mockQuests);
  const [posts, setPosts] = useState(mockPosts);

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

  const handleDeleteMessage = (messageId: number) => {
    if (userRole === 'moderator' || userRole === 'admin') {
      setChatMessages(chatMessages.filter(msg => msg.id !== messageId));
    }
  };

  const handleDeletePost = (postId: number) => {
    if (userRole === 'moderator' || userRole === 'admin') {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handlePurchase = (price: number) => {
    if (userCoins >= price) {
      setUserCoins(userCoins - price);
    }
  };

  const handleCompleteQuest = (questId: string, reward: number) => {
    setQuests(quests.map(q => q.id === questId ? { ...q, completed: true } : q));
    setUserCoins(userCoins + reward);
  };

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        selectedBorder={selectedBorder}
        setSelectedBorder={setSelectedBorder}
        handleAuth={handleAuth}
        achievements={achievements}
        avatarBorders={avatarBorders}
        userCoins={userCoins}
      />

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'news' && (
          <NewsSection userRole={userRole} mockNews={mockNews} />
        )}

        {activeSection === 'discussions' && (
          <DiscussionsSection
            isAuthenticated={isAuthenticated}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            filteredPosts={filteredPosts}
            userRole={userRole}
            onDeletePost={handleDeletePost}
          />
        )}

        {activeSection === 'chat' && (
          <ChatSection
            isAuthenticated={isAuthenticated}
            chatMessages={chatMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            setIsAuthOpen={setIsAuthOpen}
            userRole={userRole}
            onDeleteMessage={handleDeleteMessage}
          />
        )}

        {activeSection === 'messages' && isAuthenticated && (
          <PrivateMessagesSection currentUserId="current-user" />
        )}

        {activeSection === 'shop' && isAuthenticated && (
          <ShopSection userCoins={userCoins} onPurchase={handlePurchase} />
        )}

        {activeSection === 'quests' && isAuthenticated && (
          <QuestsSection quests={quests} onCompleteQuest={handleCompleteQuest} />
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border-violet-500/20">
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
