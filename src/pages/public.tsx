import reactLogo from "../assets/react.svg";

export function PublicPage() {
    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h4>This is a page that do not requires the user to be authenticated</h4>
        </>
    );
}

