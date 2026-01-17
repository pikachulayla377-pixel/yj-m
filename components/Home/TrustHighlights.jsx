import {
  FaBolt,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaUsers,
  FaRobot,
} from "react-icons/fa";

export default function TrustHighlights() {
  const items = [
    {
      title: "24/7",
      subtitle: "Instant Delivery",
      icon: FaBolt,
      accent: "from-yellow-400/20 to-orange-400/20",
      text: "text-yellow-400",
    },
    {
      title: "100%",
      subtitle: "Safe & Legitimate",
      icon: FaShieldAlt,
      accent: "from-green-400/20 to-emerald-400/20",
      text: "text-green-400",
    },
    {
      title: "Easy",
      subtitle: "Secure Payments",
      icon: FaCreditCard,
      accent: "from-blue-400/20 to-cyan-400/20",
      text: "text-blue-400",
    },
    {
      title: "24/7",
      subtitle: "Instant Support",
      icon: FaHeadset,
      accent: "from-purple-400/20 to-pink-400/20",
      text: "text-purple-400",
    },
    {
      title: "Trusted",
      subtitle: "By Thousands",
      icon: FaUsers,
      accent: "from-yellow-300/20 to-amber-400/20",
      text: "text-yellow-300",
    },
    {
      title: "Fast",
      subtitle: "Automated Topups",
      icon: FaRobot,
      accent: "from-cyan-400/20 to-sky-400/20",
      text: "text-cyan-400",
    },
  ];

  return (
    <section className="py-10 px-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="
                  group relative overflow-hidden
                  bg-[var(--card)]
                  border border-[var(--border)]
                  rounded-xl
                  p-3 md:p-6
                  text-center
                  transition-all duration-300
                  md:hover:-translate-y-1 md:hover:shadow-xl
                "
              >
                {/* Glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition
                  bg-gradient-to-br ${item.accent}`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 md:gap-3">
                  <div
                    className={`
                      w-9 h-9 md:w-12 md:h-12
                      rounded-lg md:rounded-xl
                      flex items-center justify-center
                      bg-black/30
                      ${item.text}
                    `}
                  >
                    <Icon className="text-sm md:text-xl" />
                  </div>

                  <p className={`text-sm md:text-xl font-bold ${item.text}`}>
                    {item.title}
                  </p>

                  <p className="text-[10px] md:text-sm text-[var(--muted)] leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
