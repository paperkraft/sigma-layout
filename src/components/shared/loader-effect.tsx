export default function LoaderEffect({ loading, loadingText, text }: { loading: boolean, loadingText?: string, text?: string }) {
    return (
        <>
            {loading ? (
                <div className="flex items-center gap-2">
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {loadingText || "Loading..."}
                </div>
            ) : text || null}
        </>
    );
}