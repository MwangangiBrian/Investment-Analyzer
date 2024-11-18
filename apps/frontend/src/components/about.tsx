import { motion } from 'framer-motion';
import { FaChartLine, FaDownload, FaRobot, FaExchangeAlt } from 'react-icons/fa';
import { Header } from './header';
import { useTheme } from '../functions/themeContext';
import { Footer } from './footer';

const About = () => {
  const { theme } = useTheme();
  
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <FaChartLine size={40} />,
      title: "Market Analysis",
      description: "Real-time data analysis for forex, stocks, and cryptocurrency markets"
    },
    {
      icon: <FaRobot size={40} />,
      title: "Automated Insights",
      description: "AI-powered analysis providing actionable investment recommendations"
    },
    {
      icon: <FaExchangeAlt size={40} />,
      title: "Multi-Market Coverage",
      description: "Comprehensive coverage across forex, stocks, and crypto markets"
    },
    {
      icon: <FaDownload size={40} />,
      title: "Report Generation",
      description: "Detailed investment reports available for download in multiple formats"
    }
  ];

  return (
    <>
    <Header />
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-white'} transition-colors duration-200 py-20 px-4`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h1 
          className={`text-5xl font-bold text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          {...fadeInUp}
        >
          Automated Investment Analyzer
        </motion.h1>
        
        <motion.p 
          className={`text-xl text-center mb-16 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Empower your investment decisions with data-driven insights and automated analysis across multiple markets.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`p-6 rounded-xl transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-900 shadow-lg'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Ready to Start?
          </h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
            Get Started Now
          </button>
        </motion.div>
      </motion.div>
    </div>

    <Footer />
    </>
  );
};

export default About;