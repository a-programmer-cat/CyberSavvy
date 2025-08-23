import React from 'react';
import { useTranslation } from 'react-i18next';

const HelpPage: React.FC = () => {
  const { t } = useTranslation();
  
  const faqs = [
    { question: t('help.faq.q1'), answer: t('help.faq.a1') },
    { question: t('help.faq.q2'), answer: t('help.faq.a2') },
    { question: t('help.faq.q3'), answer: t('help.faq.a3') }
  ];

  const emergencyContacts = [
    { title: t('help.emergency.police'), details: t('help.emergency.police_details'), link: null, phone: "999" },
    { title: t('help.emergency.cybersecurity'), details: null, link: t('help.links.cybersecurity'), phone: t('help.emergency.cybersecurity_phone') },
    { title: t('help.emergency.bnm'), details: null, link: t('help.links.bnm'), phone: t('help.emergency.bnm_phone') }
  ];

  const reportChannels = [
    { title: t('help.report.scam'), description: t('help.report.scam_desc'), link: t('help.links.scam_report'), linkText: t('help.links.scam_report_text') },
    { title: t('help.report.fraud'), description: t('help.report.fraud_desc'), link: t('help.links.fraud_report'), linkText: t('help.links.fraud_report_text') },
    { title: t('help.report.phishing'), description: t('help.report.phishing_desc'), link: `mailto:${t('help.links.phishing_email')}`, linkText: t('help.links.phishing_email') }
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-text-main">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gradient-start mb-6">
          {t('help.title')}
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-bg-card p-6 rounded-lg border border-bg-border shadow-md">
            <h2 className="text-xl font-semibold text-error mb-4">
              {t('help.emergency.title')}
            </h2>
            <ul className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-error mr-2">•</span>
                  <div>
                    <strong>{contact.title}:</strong>
                    <p className="text-text-secondary">
                      {contact.details && <>{contact.details}<br /></>}
                      {contact.link && (
                        <>
                          <a 
                            href={contact.link === 'help.links.cybersecurity' ? 'https://www.cybersecurity.my' : 'https://bnm.gov.my'} 
                            className="text-primary hover:text-primary-hover hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {contact.link}
                          </a>
                          <br />
                        </>
                      )}
                      {t('help.emergency.phone')}: {contact.phone}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-bg-card p-6 rounded-lg border border-bg-border shadow-md">
            <h2 className="text-xl font-semibold text-primary mb-4">
              {t('help.report.title')}
            </h2>
            <ul className="space-y-3">
              {reportChannels.map((channel, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <div>
                    <strong>{channel.title}:</strong>
                    <p className="text-text-secondary">
                      <a 
                        href={
                          channel.link.startsWith('mailto:') 
                            ? channel.link 
                            : (channel.link === 'help.links.scam_report_text'
                              ? 'https://www.aduan.skmm.gov.my'
                              : 'https://www.rmp.gov.my')
                        } 
                        className="text-primary hover:text-primary-hover hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {channel.linkText}
                      </a>
                      <br />
                      {channel.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-bg-card p-6 rounded-lg border border-bg-border shadow-md">
          <h2 className="text-xl font-semibold text-text-main mb-4">
            {t('help.faq.title')}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-bg-border pb-4">
                <h3 className="font-medium text-highlight-blue">{faq.question}</h3>
                <p className="text-text-secondary mt-1 whitespace-pre-line">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 bg-bg-card p-6 rounded-lg border border-info shadow-md">
          <h2 className="text-xl font-semibold text-info mb-3">
            {t('help.tips.title')}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li className="text-highlight-blue">{t('help.tips.tip1')}</li>
            <li className="text-highlight-green">{t('help.tips.tip2')}</li>
            <li className="text-highlight-purple">{t('help.tips.tip3')}</li>
            <li>{t('help.tips.tip4')}</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
