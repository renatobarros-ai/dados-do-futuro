import Header from '../components/Header'

export default function Data() {
  return (
    <>
      <Header />
      <div className="max-w-app mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
          Análise de Dados
        </h1>
        <div className="card p-6">
          <p className="text-slate-600 dark:text-slate-400">
            Implementaremos os filtros e gráficos na próxima etapa...
          </p>
        </div>
      </div>
    </>
  )
}
