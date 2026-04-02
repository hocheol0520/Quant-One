export interface PerformanceReport {
  id?: string;
  date: string;
  returnValue: number;
  type: 'daily' | 'weekly';
  description?: string;
  imageUrl?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'user';
}
