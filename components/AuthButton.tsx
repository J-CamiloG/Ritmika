export default function AuthButton({ clientId, redirectUri }: { clientId: string; redirectUri: string }) {
    const handleLogin = () => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-read-private%20user-read-email&response_type=token&show_dialog=true`;
    };

    return (
        <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center"
        >
            Login with Spotify
        </button>
    );
}
