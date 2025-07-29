import React, { useState, useEffect } from 'react';
import { ChevronRight, DollarSign, TrendingUp, Star, Clock, Shield, Play, MessageCircle, CheckCircle } from 'lucide-react';

interface QuizData {
  currentStep: number;
  answers: Record<string, string>;
  score: number;
}

function App() {
  const [quizData, setQuizData] = useState<QuizData>({
    currentStep: 0,
    answers: {},
    score: 0
  });
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionKey: string, answer: string, points: number = 0) => {
    setQuizData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionKey]: answer },
      score: prev.score + points,
      currentStep: prev.currentStep + 1
    }));
  };

  const getExpectedEarnings = () => {
    const baseEarning = 3000;
    const multiplier = 1 + (quizData.score * 0.1);
    return Math.round(baseEarning * multiplier);
  };

  const renderProgressBar = () => {
    const progress = (quizData.currentStep / 7) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  // Page 0 - Landing
  if (quizData.currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
                <TrendingUp className="w-4 h-4" />
                TENDÊNCIA VIRAL 2025
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Pessoas estão lucrando mais de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                  R$ 3.000
                </span>{' '}
                por semana
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                com essa nova tendência que está dominando o Brasil inteiro
              </p>
            </div>

            <div className="relative mb-12">
              <img 
                src="https://media.inlead.cloud/uploads/33466/2025-07-26/MJO7P-0f1c2dbe-9cc7-4021-acf0-70559ae51084.webp"
                alt="Morangos do Amor"
                className="w-full h-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-bold text-sm rotate-12 shadow-lg">
                🔥 VIRAL
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-pink-100">
              <div className="flex items-center justify-center gap-4 mb-6">
                <DollarSign className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold text-gray-900">Descubra a receita oficial</span>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-lg text-gray-600 mb-6">
                + estratégias de venda que realmente dão lucro
              </p>
              <button
                onClick={() => setQuizData(prev => ({ ...prev, currentStep: 1 }))}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🍓 Sim, Quero Aprender! 
                <ChevronRight className="inline w-6 h-6 ml-2" />
              </button>
            </div>

            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>+2.847 pessoas já aprenderam</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Garantia de 30 dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page 1 - Success Case
  if (quizData.currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          {renderProgressBar()}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Veja o caso da <span className="text-red-500">Vitória</span>
              </h2>
              <p className="text-xl text-gray-600">Uma jovem de 27 anos que mudou de vida</p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
              <img 
                src="https://media.inlead.cloud/uploads/33466/2025-07-26/7kb6X-whatsapp-image-2025-07-26-at-205041.jpg"
                alt="Caso de sucesso Vitória"
                className="w-full h-full object-cover"
              />
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-green-600">R$ 34.000</div>
                    <div className="text-sm text-gray-600">em apenas 2 dias</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-red-100 to-red-50 p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-red-600">2.000</div>
                    <div className="text-sm text-gray-600">unidades vendidas</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-pink-100 to-pink-50 p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-pink-600">R$ 17</div>
                    <div className="text-sm text-gray-600">por unidade</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl mb-8">
                  <h3 className="font-bold text-lg mb-4">🍓 O Segredo do Sucesso:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✅ Casquinha de açúcar caramelizado vermelha e crocante</li>
                    <li>✅ Recheio de brigadeiro de leite ninho</li>
                    <li>✅ Morango fresco de qualidade</li>
                    <li>✅ Técnica profissional de cristalização</li>
                  </ul>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setQuizData(prev => ({ ...prev, currentStep: 2 }))}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Quero ter o mesmo sucesso!
                    <ChevronRight className="inline w-6 h-6 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page 2 - Experience Question
  if (quizData.currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          {renderProgressBar()}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12">
              Você trabalha ou já trabalhou com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                doces, confeitaria ou festas?
              </span>
            </h2>

            <div className="space-y-6">
              <button
                onClick={() => handleAnswer('experience', 'professional', 25)}
                className="w-full bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 border-2 border-green-200 hover:border-green-400 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl">😍</span>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900 group-hover:text-green-700">
                      Sim, já trabalho com isso!
                    </div>
                    <div className="text-sm text-gray-600">
                      Perfeito! Você já tem experiência na área
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleAnswer('experience', 'tried', 15)}
                className="w-full bg-white hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 border-2 border-yellow-200 hover:border-yellow-400 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl">🥺</span>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900 group-hover:text-yellow-700">
                      Tentei mas não deu certo
                    </div>
                    <div className="text-sm text-gray-600">
                      Agora você vai aprender do jeito certo!
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleAnswer('experience', 'interested', 20)}
                className="w-full bg-white hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 border-2 border-pink-200 hover:border-pink-400 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl">🤔</span>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900 group-hover:text-pink-700">
                      Não, mas tenho interesse!
                    </div>
                    <div className="text-sm text-gray-600">
                      Ótimo momento para começar!
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page 3 - Morango Experience
  if (quizData.currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          {renderProgressBar()}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12">
              Você já tentou fazer os{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                "Morangos do Amor"?
              </span>
            </h2>

            <div className="space-y-6">
              <button
                onClick={() => handleAnswer('morango_experience', 'imperfect', 20)}
                className="w-full bg-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 border-2 border-orange-200 hover:border-orange-400 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl">😐</span>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900 group-hover:text-orange-700">
                      Sim, mas não ficou perfeito
                    </div>
                    <div className="text-sm text-gray-600">
                      Vamos te ensinar os segredos profissionais!
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleAnswer('morango_experience', 'made_no_sell', 15)}
                className="w-full bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 border-2 border-blue-200 hover:border-blue-400 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl">😪</span>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900 group-hover:text-blue-700">
                      Fiz, mas nunca vendi
                    </div>
                    <div className="text-sm text-gray-600">
                      Hora de monetizar seu talento!
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleAnswer('morango_experience', 'want_learn', 25)}
                className="w-full bg-white hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 border-2 border-red-200 hover:border-red-400 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl">😭</span>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900 group-hover:text-red-700">
                      Não, mas quero aprender!
                    </div>
                    <div className="text-sm text-gray-600">
                      Perfeito! Vamos do zero ao sucesso!
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page 4 - Secret Technique
  if (quizData.currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          {renderProgressBar()}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-purple-200">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4" />
                SEGREDO PROFISSIONAL
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Você sabia que existe uma técnica chamada{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  "Cristalização Dupla"?
                </span>
              </h2>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl mb-8">
                <p className="text-xl text-gray-700 mb-4">
                  Usada por confeiteiros profissionais para deixar o morango{' '}
                  <strong>crocante e brilhante por muito mais tempo</strong>
                </p>
                <div className="flex justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>+300% durabilidade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Brilho profissional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Crocância perfeita</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <button
                  onClick={() => handleAnswer('technique', 'want_learn', 30)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl">😱</span>
                    <div className="text-left">
                      <div className="text-xl font-bold">
                        Não, mas quero aprender!
                      </div>
                      <div className="text-sm opacity-90">
                        Esse é o diferencial que você precisa!
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAnswer('technique', 'seen_online', 10)}
                  className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 text-gray-900 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl">😆</span>
                    <div className="text-left">
                      <div className="text-xl font-bold">
                        Sim, já vi na internet
                      </div>
                      <div className="text-sm text-gray-600">
                        Mas você sabe fazer corretamente?
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page 5 - Sales Strategy
  if (quizData.currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {renderProgressBar()}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-green-200">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                <TrendingUp className="w-4 h-4" />
                ESTRATÉGIA DE VENDAS
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Fazer morango todo mundo faz...
              </h2>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl mb-8">
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  Agora ensinar a{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                    vender todo dia na Internet
                  </span>{' '}
                  através de anúncios, ninguém ensina!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-red-700 mb-3">❌ Jeito Amador:</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Postar nas redes sociais sem estratégia</li>
                    <li>• Vender só para conhecidos</li>
                    <li>• Não saber precificar</li>
                    <li>• Ficar dependente de eventos</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-green-700 mb-3">✅ Jeito Profissional:</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Anúncios pagos que convertem</li>
                    <li>• Sistema de vendas automatizado</li>
                    <li>• Precificação estratégica</li>
                    <li>• Vendas todos os dias</li>
                  </ul>
                </div>
              </div>

              <p className="text-xl text-gray-700 mb-8">
                Você também quer aprender a vender pela internet,{' '}
                <strong>sem se humilhar nas redes sociais?</strong>
              </p>

              <div className="space-y-6">
                <button
                  onClick={() => handleAnswer('sales_interest', 'want_both', 35)}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl">😍</span>
                    <div className="text-left">
                      <div className="text-xl font-bold">
                        Sim, quero também!
                      </div>
                      <div className="text-sm opacity-90">
                        Receita + Estratégia de Vendas Completa
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAnswer('sales_interest', 'recipe_only', 10)}
                  className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 text-gray-900 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl">😊</span>
                    <div className="text-left">
                      <div className="text-xl font-bold">
                        Não, quero aprender só a receita!
                      </div>
                      <div className="text-sm text-gray-600">
                        Apenas o passo a passo da receita
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Final CTA Page
  if (quizData.currentStep === 6) {
    const expectedEarnings = getExpectedEarnings();
    const successRate = Math.min(75 + quizData.score, 95);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 animate-bounce">
                <CheckCircle className="w-6 h-6" />
                PARABÉNS!
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Seu perfil tem tudo a ver com o doce que virou{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                  tendência nas redes
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Descubra o passo a passo para fazer e vender
              </p>
            </div>

            {/* Earnings Projection */}
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-3xl p-8 mb-8 border-2 border-green-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  📊 Sua Projeção de Ganhos
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  R$ {expectedEarnings.toLocaleString('pt-BR')}
                </div>
                <div className="text-gray-600">por mês com base no seu perfil</div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center bg-white p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    R$ {Math.round(expectedEarnings / 4).toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600">por semana</div>
                </div>
                <div className="text-center bg-white p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    R$ {Math.round(expectedEarnings / 30).toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600">por dia</div>
                </div>
                <div className="text-center bg-white p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{successRate}%</div>
                  <div className="text-sm text-gray-600">chance de sucesso</div>
                </div>
              </div>
            </div>

            {/* Main Offer */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border-2 border-red-200">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 text-center">
                <h2 className="text-3xl font-bold mb-2">🍓 Morangos do Amor Gourmet</h2>
                <p className="text-lg opacity-90">Receita Completa + Estratégia de Vendas</p>
              </div>

              <div className="p-8">
                {/* Timer */}
                <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-6 mb-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Clock className="w-6 h-6 text-red-500" />
                    <span className="font-bold text-red-700">Oferta Disponível por:</span>
                  </div>
                  <div className="text-4xl font-bold text-red-600">
                    {formatTime(timeLeft)}
                  </div>
                </div>

                {/* O que você vai receber */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    🎁 O QUE VOCÊ VAI RECEBER
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900">📖 Receita Completa</h4>
                          <p className="text-sm text-gray-600">Passo a passo detalhado com fotos de cada etapa</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900">🎥 Vídeo Aula</h4>
                          <p className="text-sm text-gray-600">Demonstração completa em vídeo HD</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900">💎 Técnica da Cristalização</h4>
                          <p className="text-sm text-gray-600">Segredo profissional para crocância perfeita</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900">📱 Estratégia de Vendas</h4>
                          <p className="text-sm text-gray-600">Como vender pela internet e redes sociais</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900">💰 Precificação</h4>
                          <p className="text-sm text-gray-600">Como calcular preços para máximo lucro</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900">📸 Templates de Posts</h4>
                          <p className="text-sm text-gray-600">Modelos prontos para Instagram e WhatsApp</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900">🎯 Anúncios Pagos</h4>
                          <p className="text-sm text-gray-600">Como criar campanhas que convertem</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900">👥 Grupo VIP</h4>
                          <p className="text-sm text-gray-600">Acesso ao grupo exclusivo de alunos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bônus Exclusivos */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    🚀 BÔNUS EXCLUSIVOS (LIMITADOS)
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">🎁</span>
                        <h4 className="font-bold text-gray-900">Bônus 1: Receitas Extras</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        +5 receitas de doces gourmet que fazem sucesso nas redes
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">📱</span>
                        <h4 className="font-bold text-gray-900">Bônus 2: App de Vendas</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Sistema automatizado para gerenciar pedidos e clientes
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">🎨</span>
                        <h4 className="font-bold text-gray-900">Bônus 3: Kit Visual</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        +50 templates de posts, stories e anúncios prontos
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">📞</span>
                        <h4 className="font-bold text-gray-900">Bônus 4: Suporte VIP</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Acesso direto ao WhatsApp para tirar dúvidas
                      </p>
                    </div>
                  </div>
                </div>

                {/* Video */}
                <div className="mb-8">
                  <div className="bg-gray-100 rounded-2xl p-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Play className="w-8 h-8 text-red-500" />
                      <span className="text-xl font-bold text-gray-900">
                        Veja o depoimento de quem já está lucrando
                      </span>
                    </div>
                    <iframe
                      src="https://www.youtube.com/embed/0JsTLfi2tgo"
                      className="w-full h-64 rounded-xl"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="mb-4">
                    <span className="text-lg text-gray-500 line-through">De R$ 129,90</span>
                  </div>
                  <div className="text-6xl font-bold text-green-600 mb-2">
                    R$ 39,99
                  </div>
                  <div className="text-gray-600">à vista</div>
                </div>

                {/* CTA Button */}
                <div className="text-center mb-8">
                  <button
                    onClick={() => window.open('https://app.1checkout.com.br/checkout/3f55d56d-4c8d-486a-add9-eadf29e65c93', '_blank')}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl animate-pulse"
                  >
                    🚀 Começar a Lucrar Agora
                  </button>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                      <span className="font-bold text-green-700">Depoimento Real</span>
                    </div>
                    <img 
                      src="https://media.inlead.cloud/uploads/33466/2025-07-26/R3T9x-whatsapp-image-2025-07-21-at-151722-645x1024.webp"
                      alt="Depoimento WhatsApp"
                      className="w-full h-full rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageCircle className="w-6 h-6 text-pink-600" />
                      <span className="font-bold text-pink-700">Mais Sucesso</span>
                    </div>
                    <img 
                      src="https://media.inlead.cloud/uploads/33466/2025-07-26/diV1z-whatsapp-image-2025-07-21-at-151722-1-779x1024.webp"
                      alt="Depoimento WhatsApp 2"
                      className="w-full h-full rounded-xl shadow-lg"
                    />
                  </div>
                </div>

                {/* Guarantee */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <img 
                      src="https://media.inlead.cloud/uploads/33466/2025-07-26/hRe7W-73p1c-selo-de-garantia-de-30-dias-png-transparente-sem-fundopng.webp"
                      alt="Garantia 30 dias"
                      className="w-16 h-full"
                    />
                    <div>
                      <div className="font-bold text-lg text-gray-900">
                        Garantia de 30 Dias
                      </div>
                      <div className="text-sm text-gray-600">
                        100% do seu dinheiro de volta
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Se dentro de 30 dias você não estiver satisfeito, devolvemos 100% do seu investimento, 
                    sem perguntas ou complicações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Modal */}
        {showOffer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎉 Parabéns!
              </h3>
              <p className="text-gray-600 mb-6">
                Você está prestes a transformar sua vida financeira com os Morangos do Amor!
              </p>
              <div className="space-y-4">
                <button 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-2xl"
                  onClick={() => window.open('https://app.1checkout.com.br/checkout/3f55d56d-4c8d-486a-add9-eadf29e65c93', '_blank')}
                >
                  💳 Garantir Minha Vaga - R$ 39,99
                </button>
                <button 
                  className="w-full text-gray-500 hover:text-gray-700"
                  onClick={() => setShowOffer(false)}
                >
                  Talvez depois...
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default App;