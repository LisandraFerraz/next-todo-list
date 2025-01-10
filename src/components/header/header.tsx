import styles from "./header.module.scss";

export function Header() {
  return (
    <div className={styles.header_group}>
      <h1>todo</h1>
      <button>
        <i className="bi bi-brightness-high-fill"></i>
      </button>
    </div>
  );
}
