import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="py-24 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="text-2xl font-display font-black tracking-tighter mb-6">
              QUANT-<span className="text-purple-500">ONE</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed break-keep">
              고도화된 알고리즘과 데이터 분석을 통해 최상의 투자 경험을 제공하는 차세대 퀀트 트레이딩 플랫폼입니다.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white/80">서비스</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-purple-400 transition-colors">알고리즘 매매</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">백테스트 리포트</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">실시간 수익률</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">커뮤니티</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white/80">고객지원</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="https://t.me/QuantOne_cs" className="hover:text-purple-400 transition-colors">텔레그램 상담</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">자주 묻는 질문</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white/80">연락처</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li>Telegram: @QuantOne_cs</li>
              <li className="pt-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20 transition-all cursor-pointer">
                    <span className="text-xs font-black">T</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20 transition-all cursor-pointer">
                    <span className="text-xs font-black">Y</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section - Improved Readability */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-[11px] text-white/30 leading-relaxed space-y-4 font-medium text-justify break-keep">
            <p>
              거래에는 위험이 따르며, 대부분의 데이트레이더와 공식 및 차트 기반 투자 전략을 사용하는 투자자들은 손실을 봅니다. 이 사이트와 Quant-One이 제공하는 제품 및 서비스는 정보 제공과 교육 목적으로만 제공됩니다. 모든 콘텐츠는 당사의 서비스를 시연하기 위해 사후에 선택된 가상의 내용으로 간주해야 하며, 금융 조언으로 해석해서는 안 됩니다. 증권, 상품 및 기타 투자를 매수, 매도, 보유 또는 거래하는 결정에는 위험이 수반되며, 자격을 갖춘 금융 전문가의 조언에 따라 내리는 것이 가장 좋습니다. 과거의 성과가 미래의 결과를 보장하지는 않습니다.
            </p>
            <p>
              자동화 거래 시스템 및 솔루션은 절대 수익을 보장하는 상품이 아닙니다. 암호화폐 시장의 특성상 주기성이 존재하므로 수익이 발생하는 주기와 손실이 발생하는 주기가 공존합니다. 이에 있어 특정 주기에 손실이 발생했다는 이유만으로 이에 대한 금전적 보상이나 환불은 불가능합니다. 자동화 거래 시스템 및 솔루션은 최소 1년 내지는 2년 이상으로 주기를 반복하며 확률과 통계학에 기반하여 점차 시드가 우상향 하는 것을 목표로 하고 있을뿐, 절대적으로 고객님의 원금을 보장하지 아니하고 100% 수익이 나지 않을 수 있음을 명확히 인지해 주시기 바랍니다.
            </p>
            <p>
              가상 또는 시뮬레이션된 성과 결과에는 특정 제한 사항이 있습니다. 실제 성과 기록과 달리, 시뮬레이션된 결과는 실제 거래를 나타내지 않습니다. 또한, 거래가 실행되지 않았기 때문에 결과는 유동성 부족과 같은 특정 시장 요인의 영향을 과소 또는 과대 평가했을 수 있습니다. 일반적으로 시뮬레이션된 거래 프로그램은 사후 판단의 이점을 통해 설계되며, 과거 정보를 기반으로 합니다. 어떠한 계정도 표시된 것과 유사한 이익 또는 손실을 달성할 가능성이 있다는 것을 보장하지 않습니다.
            </p>
            <p>
              이 웹사이트에 나타나는 고객 후기는 다른 고객을 대표하지 않을 수 있으며, 향후 성과나 성공을 보장하지 않습니다.
            </p>
            <p>
              차트 플랫폼을 위한 기술 분석 도구 제공업체로서 당사는 고객의 개인 거래 계좌나 중개 계좌에 접근할 수 없습니다. 따라서 당사가 제공하는 콘텐츠나 도구를 기반으로 고객이 전체 트레이더보다 더 나은 성과를 거둔다고 믿을 이유가 없습니다.
            </p>
            <p>
              이것은 당사의 전체 면책 조항을 나타내지 않으므로, 전체 면책 조항을 꼭 읽어 보시기 바랍니다.
            </p>
          </div>
          <div className="mt-8 text-center text-white/20 text-[10px]">
            © 2026 QUANT-ONE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
