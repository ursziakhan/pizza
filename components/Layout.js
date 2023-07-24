import { useSession, signIn, signOut } from 'next-auth/react';
import 'tailwindcss/tailwind.css';
import Nav from '../components/Nav.js';

export default function Layout({ children }) {
  const { data: session } = useSession();
  /* if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full text-2xl text-white">
          <button
            className="bg-black-600  border p-3 rounded-lg hover:bg-blue-500 "
            onClick={() => signIn()}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  } else { */
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
        {children}
      </div>
    </div>
  );
}
// }
