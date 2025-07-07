
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';

interface OnlineClass {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  instructor: string;
  difficulty_level: string;
  category_id: string;
  active: boolean;
  order_index: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const AdminClassesContent = () => {
  const { toast } = useToast();
  const [classes, setClasses] = useState<OnlineClass[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClass, setEditingClass] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: '',
    duration: 0,
    instructor: '',
    difficulty_level: 'Iniciante',
    category_id: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [classesResponse, categoriesResponse] = await Promise.all([
        supabase.from('online_classes').select('*').order('order_index'),
        supabase.from('class_categories').select('*').order('order_index')
      ]);

      if (classesResponse.data) setClasses(classesResponse.data);
      if (categoriesResponse.data) setCategories(categoriesResponse.data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar dados',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateClass = async (classItem: OnlineClass) => {
    try {
      const { error } = await supabase
        .from('online_classes')
        .update({
          title: classItem.title,
          description: classItem.description,
          video_url: classItem.video_url,
          thumbnail_url: classItem.thumbnail_url,
          duration: classItem.duration,
          instructor: classItem.instructor,
          difficulty_level: classItem.difficulty_level,
          category_id: classItem.category_id,
        })
        .eq('id', classItem.id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Aula atualizada com sucesso',
      });
      setEditingClass(null);
      loadData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar aula',
        variant: 'destructive',
      });
    }
  };

  const addClass = async () => {
    try {
      const { error } = await supabase
        .from('online_classes')
        .insert([{
          ...newClass,
          order_index: classes.length,
        }]);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Aula adicionada com sucesso',
      });
      setShowAddForm(false);
      setNewClass({
        title: '',
        description: '',
        video_url: '',
        thumbnail_url: '',
        duration: 0,
        instructor: '',
        difficulty_level: 'Iniciante',
        category_id: '',
      });
      loadData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao adicionar aula',
        variant: 'destructive',
      });
    }
  };

  const deleteClass = async (id: string) => {
    try {
      const { error } = await supabase
        .from('online_classes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Aula removida com sucesso',
      });
      loadData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao remover aula',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Aulas Online</span>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus size={16} className="mr-2" />
              Nova Aula
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-3">Nova Aula</h3>
              <div className="space-y-3">
                <Input
                  value={newClass.title}
                  onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                  placeholder="Título da aula"
                />
                <Textarea
                  value={newClass.description}
                  onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  placeholder="Descrição"
                />
                <Input
                  value={newClass.video_url}
                  onChange={(e) => setNewClass({ ...newClass, video_url: e.target.value })}
                  placeholder="URL do vídeo"
                />
                <Input
                  value={newClass.thumbnail_url}
                  onChange={(e) => setNewClass({ ...newClass, thumbnail_url: e.target.value })}
                  placeholder="URL da thumbnail"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    value={newClass.duration}
                    onChange={(e) => setNewClass({ ...newClass, duration: parseInt(e.target.value) })}
                    placeholder="Duração (minutos)"
                  />
                  <Input
                    value={newClass.instructor}
                    onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
                    placeholder="Instrutor"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select value={newClass.difficulty_level} onValueChange={(value) => setNewClass({ ...newClass, difficulty_level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Nível de dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Iniciante">Iniciante</SelectItem>
                      <SelectItem value="Intermediário">Intermediário</SelectItem>
                      <SelectItem value="Avançado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={newClass.category_id} onValueChange={(value) => setNewClass({ ...newClass, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={addClass}>
                    <Save size={16} className="mr-1" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {classes.map((classItem) => (
            <div key={classItem.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{classItem.title}</h3>
                  <p className="text-sm text-gray-600">{classItem.description}</p>
                  <div className="text-xs text-gray-400 mt-1 space-x-4">
                    <span>Instrutor: {classItem.instructor}</span>
                    <span>Duração: {classItem.duration}min</span>
                    <span>Nível: {classItem.difficulty_level}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingClass(classItem.id)}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteClass(classItem.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminClassesContent;
