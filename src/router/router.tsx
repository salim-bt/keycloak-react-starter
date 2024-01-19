import { createBrowserRouter, type LoaderFunctionArgs } from "react-router-dom";
import { Layout } from "./layout";
import { ProtectedPage } from "../pages/protected";
import { PublicPage } from "../pages/public";
import { prOidc } from "../oidc";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                path: "protected",
                Component: ProtectedPage,
                loader: protectedRouteLoader
            },
            {
                index: true,
                Component: PublicPage
            }
        ]
    }
]);

async function protectedRouteLoader({ request }: LoaderFunctionArgs) {
    const oidc = await prOidc;

    if (!oidc.isUserLoggedIn) {
        // Replace the href without reloading the page.
        // This is a way to make oidc-spa know where to redirect the user
        // if the authentication process is successful.
        history.pushState({}, "", request.url);

        await oidc.login({ doesCurrentHrefRequiresAuth: true });

        // Never here, the login method redirects the user to the identity provider.
    }

    return null;
}
