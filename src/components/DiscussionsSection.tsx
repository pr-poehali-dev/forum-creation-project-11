import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DiscussionsSectionProps {
  isAuthenticated: boolean;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
    posts: number;
  }>;
  filteredPosts: Array<{
    id: number;
    title: string;
    author: string;
    avatar: string;
    category: string;
    replies: number;
    views: number;
    timestamp: string;
    isPinned: boolean;
    isNews: boolean;
  }>;
  userRole: 'user' | 'moderator' | 'admin';
  onDeletePost: (postId: number) => void;
}

export default function DiscussionsSection({
  isAuthenticated,
  selectedCategory,
  setSelectedCategory,
  categories,
  filteredPosts,
  userRole,
  onDeletePost,
}: DiscussionsSectionProps) {
  return (
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
                  <Badge variant="secondary">{filteredPosts.length}</Badge>
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
                className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer animate-fade-in group"
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
                        {(userRole === 'moderator' || userRole === 'admin') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeletePost(post.id);
                            }}
                          >
                            <Icon name="Trash2" size={16} className="text-destructive" />
                          </Button>
                        )}
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
  );
}