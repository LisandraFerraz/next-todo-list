"use client";
import styles from "./main-page.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import BgImg from "./../assets/bg-desktop-dark.jpg";
import Image from "next/image";
import { Header } from "@/components/header/header";
import { List } from "@/components/list/list";

export default function Home() {
  return (
    <>
      <div className={styles.bg_img}></div>
      <div className={styles.container}>
        <Header />
        <List />
      </div>
    </>
  );
}
