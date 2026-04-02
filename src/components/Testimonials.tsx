import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: '김*훈',
    role: '전업 트레이더',
    content: '수동 매매할 땐 밤에 잠도 못 자고 차트만 뚫어져라 봤어요. 손절 타이밍 놓치면 멘탈 나가고... 근데 퀀트원 쓰고 나서부터는 그냥 시스템에 맡기고 제 생활을 찾았습니다. 수익도 수익인데, 심리적으로 안정된 게 제일 커요.',
    rating: 5
  },
  {
    name: '이*민',
    role: '직장인 투자자',
    content: '회사 업무 보면서 틈틈이 차트 보는 게 눈치 보이고 힘들었거든요. 퀀트원은 알아서 리스크 관리해주고 익절해주니까 신경 쓸 게 없네요. 처음엔 반신반의했는데, 하락장에서도 방어되는 거 보고 진짜 놀랐습니다.',
    rating: 5
  },
  {
    name: '박*준',
    role: '자산 운용가',
    content: '시중에 자동 매매 툴은 많지만, 로직이 투명하고 MDD 관리가 이렇게 정교한 건 드뭅니다. 데이터는 거짓말을 안 하잖아요. 퀀트원의 백테스트 결과가 실전에서도 그대로 재현되는 걸 보면서 확신을 가졌습니다.',
    rating: 5
  },
  {
    name: '최*아',
    role: '개인 투자자',
    content: '주식만 하다가 코인 자동매매는 처음인데 설정이 너무 간편해서 좋았어요. 소액으로 시작했는데 벌써 원금 회수하고 수익권입니다. 텔레그램 알림으로 매매 현황 바로바로 오는 게 진짜 편해요.',
    rating: 5
  },
  {
    name: '정*우',
    role: 'IT 엔지니어',
    content: '개발자 입장에서 로직을 뜯어봐도 상당히 합리적입니다. 과최적화되지 않은 파라미터 설계가 인상적이었어요. 변동성이 심한 구간에서도 무리하게 진입하지 않는 걸 보고 신뢰가 생겼습니다.',
    rating: 5
  },
  {
    name: '강*현',
    role: '자영업자',
    content: '가게 운영하느라 바빠서 투자는 꿈도 못 꿨는데, 퀀트원 덕분에 부수입이 쏠쏠합니다. 장사 안되는 날에도 계좌는 빨간불인 거 보면 위안이 돼요. 주변 사장님들한테도 추천 많이 하고 있습니다.',
    rating: 5
  },
  {
    name: '윤*서',
    role: '대학생',
    content: '알바비 모은 걸로 투자 시작했는데, 제가 직접 했으면 벌써 다 날렸을 거예요. 시스템이 알아서 해주니까 공부할 시간도 벌고 돈도 벌고 일석이조입니다. 수익률이 생각보다 높아서 놀랐어요.',
    rating: 5
  },
  {
    name: '한*재',
    role: '금융권 종사자',
    content: '업계에 있다 보니 여러 솔루션을 접하는데, 퀀트원의 알고리즘은 확실히 차별점이 있습니다. 특히 시장 국면 전환에 따른 대응 속도가 굉장히 빨라요. 전문적인 투자자들에게도 충분히 매력적인 도구입니다.',
    rating: 5
  },
  {
    name: '오*택',
    role: '퇴직자',
    content: '노후 자금 관리가 걱정이었는데 퀀트원을 만나고 한시름 놓았습니다. 공격적인 수익보다는 안정적인 우상향을 원했는데 딱 제가 찾던 스타일이에요. 상담원분들도 친절하게 설명해주셔서 감사했습니다.',
    rating: 5
  },
  {
    name: '임*지',
    role: '프리랜서',
    content: '작업하다가 중간중간 수익 확인하는 재미로 삽니다. 예전엔 손실 나면 작업도 손에 안 잡혔는데 이젠 믿고 맡기니까 스트레스가 없어요. 디자인도 깔끔하고 사용하기 너무 편합니다.',
    rating: 5
  },
  {
    name: '송*호',
    role: '사업가',
    content: '시간이 곧 돈인 사람들에게 최고의 파트너입니다. 복잡한 분석 없이도 퀀트 데이터 기반의 투자를 할 수 있다는 게 가장 큰 장점이죠. 자산 배분 전략이 훌륭해서 큰 금액을 맡겨도 안심이 됩니다.',
    rating: 5
  },
  {
    name: '권*나',
    role: '주부',
    content: '재테크에 관심은 많았지만 어려워서 포기했었는데, 퀀트원은 정말 쉽네요. 상담 채널에서 하나하나 다 알려주셔서 금방 적응했어요. 매달 생활비 보탬이 될 정도로 수익이 나고 있어서 만족합니다.',
    rating: 5
  },
  {
    name: '신*민',
    role: '트레이딩 팀장',
    content: '팀 단위로 운용하면서 보조 지표로 활용 중인데, 진입 타점이 굉장히 날카롭습니다. 저희 팀 전략이랑 시너지가 좋아서 수익률이 배로 뛰었어요. 기술력이 확실히 느껴지는 플랫폼입니다.',
    rating: 5
  },
  {
    name: '유*빈',
    role: '해외 거주자',
    content: '시차 때문에 한국 시장 대응하기 힘들었는데 자동매매라 너무 편해요. 자고 일어나면 수익 나 있는 거 확인하는 게 일상의 즐거움입니다. 해외에서도 접속 잘 되고 속도도 빨라서 좋아요.',
    rating: 5
  },
  {
    name: '조*성',
    role: '퀀트 분석가',
    content: '백테스트 수치와 실전 매매 결과의 괴리율이 매우 낮습니다. 이는 모델의 견고함을 증명하는 거죠. 리스크 관리 로직이 겹겹이 쌓여 있어 블랙스완 상황에서도 자산을 보호할 수 있는 시스템입니다.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-[1.2]">
            트레이더들의 <br className="sm:hidden" /> <span className="text-purple-400">진솔한 이야기</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto break-keep">
            퀀트원과 함께 새로운 투자 경험을 시작한 실제 사용자들의 후기입니다.
          </p>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Continuous Marquee */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 80, // Increased from 40 to 80 for slower scroll
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-6 whitespace-nowrap"
        >
          {/* Double the items for seamless loop */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[350px] md:w-[450px] glass p-8 rounded-[32px] border-white/5 shadow-xl flex flex-col shrink-0"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 fill-purple-400 text-purple-400" />
                  ))}
                </div>
                <Quote className="w-10 h-10 text-purple-500/10" />
              </div>

              <p className="text-lg text-white/70 mb-8 leading-relaxed italic whitespace-normal break-keep flex-grow">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-900/30 flex items-center justify-center font-bold text-lg text-purple-400 border border-purple-500/20">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-base font-bold text-white">{t.name}</div>
                  <div className="text-xs text-white/40 font-medium tracking-wide uppercase">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
