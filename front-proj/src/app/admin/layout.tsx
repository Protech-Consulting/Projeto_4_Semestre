'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Usuários', path: '/admin/users' },
    { name: 'Estoque', path: '/admin/estoque' },
    { name: 'Anuncios', path: '/admin/anuncios' },
    { name: 'Configurações', path: '/admin/settings' },
  ];
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Menu lateral */}
      <aside style={{ width: '250px', background: '#9F96D9', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Admin Menu</h2>
        <div className="rounded-full overflow-hidden w-32 h-32 mb-4">
          <img
            src="https://img.freepik.com/fotos-gratis/retrato-de-homem-branco-isolado_53876-40306.jpg"
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>
        <nav>
          <ul className="text-white text-center">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <li className='hover:bg-slate-500' key={item.path} style={{ marginBottom: '1rem' }}>
                <Link href={item.path} legacyBehavior>
                  <a
                    style={{
                      display: 'block',
                      padding: '0.5rem 1rem',
                      color: isActive ? '#fff' : '#F1F1F1',
                      backgroundColor: isActive ? '#007bff' : 'transparent',
                      borderRadius: '4px',
                      textDecoration: 'none',
                    }}
                  >
                    {item.name}
                  </a>
                </Link>
              </li>
            );
          })}
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: '1rem' }}>
        {children} {/* Aqui serão renderizadas as páginas */}
      </main>
    </div>
  );
}
