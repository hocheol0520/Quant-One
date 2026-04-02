import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { BlogPost } from '../types';
import { format } from 'date-fns';
import { ArrowRight, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'blog'), orderBy('createdAt', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      setPosts(data);
    });
    return unsubscribe;
  }, []);

  return (
    <section id="blog" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-4">시장 분석 리포트</h2>
            <p className="text-white/50 max-w-md break-keep">
              퀀트 트레이딩 전략, 시장 트렌드 및 최신 알고리즘 업데이트에 대한 전문가의 통찰력을 확인하세요.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition-colors">
            전체 보기
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.length > 0 ? posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl overflow-hidden group hover:border-purple-500/30 transition-all flex flex-col"
            >
              <div className="p-8 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-purple-500/10 text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="text-white/50 text-sm line-clamp-3 mb-6">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
              </div>
              <div className="p-8 pt-0 mt-auto">
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-[10px] font-bold">
                      {post.author[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{post.author}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{format(new Date(post.createdAt), 'yyyy.MM.dd')}</div>
                    </div>
                  </div>
                  <button className="p-2 rounded-full bg-white/5 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          )) : (
            [1, 2, 3].map(i => (
              <div key={i} className="glass rounded-3xl h-[400px] animate-pulse" />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
