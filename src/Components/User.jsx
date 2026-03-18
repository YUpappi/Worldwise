import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { useAuth } from "../utils/useAuth";

function User() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    function handleChange(event) {
      if (!event.matches) {
        setIsOpen(false);
      }
    }

    handleChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  if (!user) return null;

  const name =
    user.user_metadata?.fullName ||
    user.user_metadata?.full_name ||
    user.email ||
    "User";
  const avatar = user.user_metadata?.avatar || "";

  function handleLogOutClick() {
    logOut();
    navigate("/");
  }

  function openConfirm() {
    setShowConfirm(true);
    setIsOpen(false);
  }

  function closeConfirm() {
    setShowConfirm(false);
  }

  function confirmLogout() {
    setShowConfirm(false);
    handleLogOutClick();
  }

  function toggleMenu() {
    setIsOpen((open) => !open);
  }

  return (
    <div className={styles.user}>
      {avatar ? (
        <img src={avatar} alt={name} className={styles.avatar} />
      ) : (
        <div className={styles.avatarFallback}>{name[0].toUpperCase()}</div>
      )}
      <span className={styles.welcome}>Welcome, {name}</span>
      <button className={styles.logoutButton} onClick={openConfirm}>
        Logout
      </button>

      <button
        type="button"
        className={styles.menuButton}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </button>

      <div
        className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
        role="menu"
      >
        <p className={styles.dropdownName}>{name}</p>
        <button
          className={styles.dropdownLogout}
          onClick={openConfirm}
          role="menuitem"
        >
          Logout
        </button>
      </div>

      {showConfirm &&
        createPortal(
          <div className={styles.modalOverlay} role="dialog" aria-modal="true">
            <div className={styles.modal}>
              <p className={styles.modalTitle}>Log out of WorldWise?</p>
              <p className={styles.modalText}>
                You can sign back in anytime to continue tracking your cities.
              </p>
              <div className={styles.modalActions}>
                <button
                  className={styles.modalCancel}
                  type="button"
                  onClick={closeConfirm}
                >
                  Cancel
                </button>
                <button
                  className={styles.modalConfirm}
                  type="button"
                  onClick={confirmLogout}
                >
                  {confirmLogout ? "Log out" : "Logging out..."}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

export default User;
