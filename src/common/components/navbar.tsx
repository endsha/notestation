import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootStoreType } from "#types/stores";
import { logout } from "@redux/user/userSlice";
import styles from "./styles/navbar.module.scss";
import Link from "next/link";

interface NavbarProps {
  // username: String;
}

const userSelector = (state: RootStoreType) => state.user;

const navbarLifecycle = (props: NavbarProps) => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const redirectHomePage = (event: any) => {
    event.preventDefault();
    router.push("/");
  };

  const logoutAccount = (event: any) => {
    event.preventDefault();
    dispatch(logout());
  };

  return {
    isAuthenticated: user.isAuthenticated,
    logoutAccount,
    redirectHomePage,
  };
};

const Navbar = (props: NavbarProps) => {
  // const { children, style, className, onClick } = props;
  const { isAuthenticated, logoutAccount, redirectHomePage } = navbarLifecycle(
    props
  );
  return (
    <div className={styles.navbarDefault}>
      <h1 onClick={(event) => redirectHomePage(event)}>NoteStation</h1>
      <div className={styles.navbarOptionsContainer}>
        {!isAuthenticated ? (
          <Link href="/login">
            <h1>Login</h1>
          </Link>
        ) : (
          <h1 onClick={(event) => logoutAccount(event)}>Logout</h1>
        )}
      </div>
    </div>
  );
};

export default Navbar;
