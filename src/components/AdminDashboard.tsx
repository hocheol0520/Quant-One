import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { PerformanceReport, BlogPost, UserProfile } from '../types';
import { cn } from '../lib/utils';
import { Plus, Trash2, LayoutDashboard, BarChart, FileText, Shield } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'performance' | 'blog'>('performance');
  const [loading, setLoading] = useState(true);

  // Performance Form
  const [perfDate, setPerfDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [perfValue, setPerfValue] = useState('');
  const [perfType, setPerfType] = useState<'daily' | 'weekly'>('daily');
  const [perfDesc, setPerfDesc] = useState('');

  // Blog Form
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogTags, setBlogTags] = useState('');

  const [reports, setReports] = useState<PerformanceReport[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userSnap.exists()) {
          setUser(userSnap.data() as UserProfile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user?.role !== 'admin') return;

    const qPerf = query(collection(db, 'performance'), orderBy('date', 'desc'));
    const unsubPerf = onSnapshot(qPerf, (snap) => {
      setReports(snap.docs.map(d => ({ id: d.id, ...d.data() } as PerformanceReport)));
    });

    const qBlog = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
    const unsubBlog = onSnapshot(qBlog, (snap) => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost)));
    });

    return () => { unsubPerf(); unsubBlog(); };
  }, [user]);

  const addPerformance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!perfValue) return;
    try {
      await addDoc(collection(db, 'performance'), {
        date: perfDate,
        returnValue: parseFloat(perfValue),
        type: perfType,
        description: perfDesc,
      });
      setPerfValue('');
      setPerfDesc('');
    } catch (err) {
      console.error(err);
    }
  };

  const addBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;
    try {
      await addDoc(collection(db, 'blog'), {
        title: blogTitle,
        content: blogContent,
        author: user?.email.split('@')[0] || 'Admin',
        createdAt: new Date().toISOString(),
        tags: blogTags.split(',').map(t => t.trim()),
      });
      setBlogTitle('');
      setBlogContent('');
      setBlogTags('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (col: string, id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, col, id));
    }
  };

  const seedData = async () => {
    if (!window.confirm('샘플 데이터를 추가하시겠습니까?')) return;
    
    try {
      const perfData = [
        { date: '2026-04-01', returnValue: 12.8, type: 'weekly', description: '4월 1째주 주간 수익률 리포트입니다. 변동성 장세에서 우수한 성과를 거두었습니다.' },
        { date: '2026-04-01', returnValue: 3.2, type: 'daily', description: '일간 수익 리포트' },
        { date: '2026-03-31', returnValue: 1.5, type: 'daily', description: '일간 수익 리포트' },
        { date: '2026-03-30', returnValue: -0.8, type: 'daily', description: '일간 수익 리포트' },
        { date: '2026-03-29', returnValue: 2.1, type: 'daily', description: '일간 수익 리포트' },
      ];
      
      for (const item of perfData) {
        await addDoc(collection(db, 'performance'), item);
      }
      
      await addDoc(collection(db, 'blog'), {
        title: '2026년 퀀트 트레이딩의 미래',
        content: '퀀트 트레이딩은 LLM과 실시간 감성 분석의 결합으로 빠르게 진화하고 있습니다...',
        author: '퀀트원 팀',
        createdAt: new Date().toISOString(),
        tags: ['퀀트', 'AI', '미래'],
      });
      
      alert('샘플 데이터가 추가되었습니다!');
    } catch (err) {
      console.error(err);
      alert('데이터 추가 실패');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  if (!user || user.role !== 'admin') return null;

  return (
    <div id="admin" className="min-h-screen pt-32 pb-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-2xl neon-purple-bg">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold">관리자 콘솔</h1>
            <p className="text-white/40">수익률 데이터 및 플랫폼 콘텐츠를 관리합니다.</p>
          </div>
          <button 
            onClick={seedData}
            className="ml-auto px-4 py-2 rounded-lg border border-white/10 text-xs font-bold hover:bg-white/5 transition-all"
          >
            샘플 데이터 추가
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab('performance')}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-bold",
                activeTab === 'performance' ? "glass text-purple-400" : "text-white/40 hover:text-white/60"
              )}
            >
              <BarChart className="w-5 h-5" />
              수익률 관리
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-bold",
                activeTab === 'blog' ? "glass text-purple-400" : "text-white/40 hover:text-white/60"
              )}
            >
              <FileText className="w-5 h-5" />
              블로그 관리
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === 'performance' ? (
              <>
                <div className="glass p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-purple-400" />
                    새 수익률 항목 추가
                  </h3>
                  <form onSubmit={addPerformance} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">날짜</label>
                      <input 
                        type="date" 
                        value={perfDate}
                        onChange={(e) => setPerfDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">수익률 (%)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="예: 2.45"
                        value={perfValue}
                        onChange={(e) => setPerfValue(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">유형</label>
                      <select 
                        value={perfType}
                        onChange={(e) => setPerfType(e.target.value as any)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                      >
                        <option value="daily">일간</option>
                        <option value="weekly">주간</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">설명</label>
                      <textarea 
                        value={perfDesc}
                        onChange={(e) => setPerfDesc(e.target.value)}
                        placeholder="전략 설명..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors h-24"
                      />
                    </div>
                    <button type="submit" className="md:col-span-2 py-4 rounded-xl neon-purple-bg text-white font-bold">
                      항목 추가
                    </button>
                  </form>
                </div>

                <div className="glass rounded-3xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">날짜</th>
                        <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">수익률</th>
                        <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">유형</th>
                        <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest text-right">작업</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {reports.map(report => (
                        <tr key={report.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-mono text-sm">{report.date}</td>
                          <td className={cn("px-6 py-4 font-bold", report.returnValue >= 0 ? "text-green-400" : "text-red-400")}>
                            {report.returnValue > 0 ? '+' : ''}{report.returnValue}%
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold uppercase tracking-widest">
                              {report.type === 'daily' ? '일간' : '주간'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => deleteItem('performance', report.id!)} className="p-2 hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="glass p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-purple-400" />
                    새 블로그 포스트
                  </h3>
                  <form onSubmit={addBlogPost} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">제목</label>
                      <input 
                        type="text" 
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">태그 (쉼표로 구분)</label>
                      <input 
                        type="text" 
                        value={blogTags}
                        onChange={(e) => setBlogTags(e.target.value)}
                        placeholder="퀀트, 시장, 전략"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">내용 (Markdown)</label>
                      <textarea 
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="내용을 입력하세요..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors h-64 font-mono text-sm"
                      />
                    </div>
                    <button type="submit" className="w-full py-4 rounded-xl neon-purple-bg text-white font-bold">
                      게시하기
                    </button>
                  </form>
                </div>

                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="glass p-6 rounded-2xl flex items-center justify-between">
                      <div>
                        <h4 className="font-bold mb-1">{post.title}</h4>
                        <div className="text-xs text-white/40 uppercase tracking-widest">
                          {format(new Date(post.createdAt), 'yyyy.MM.dd')} • {post.author}
                        </div>
                      </div>
                      <button onClick={() => deleteItem('blog', post.id!)} className="p-2 hover:text-red-400 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
