import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdOutlineMap } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const { pathname } = useLocation();
  const isPin = pathname === "/pin";
  const isPayment = pathname === "/payment";
  const isOtp = pathname === "/otp";
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  // Countdown target: 31 Dec 2025 23:59:59 (local time)
  const targetDate = new Date(2025, 11, 31, 15, 0, 0);

  const getTimeParts = (diffMs) => {
    if (diffMs <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds, done: false };
  };

  const [timeLeft, setTimeLeft] = useState(
    getTimeParts(targetDate - Date.now())
  );

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeParts(targetDate - Date.now()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const { days, hours, minutes, seconds, done } = timeLeft;

  const formattedDays = String(days).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (
    isPin ||
    isPayment ||
    isOtp
  )
    return;
  return (
    <header className="bg-white border-b border-gray-200 pt-4 px-6 w-full flex ">
      <div className="container mx-auto flex flex-row-reverse items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.jpeg" alt="Tawtheeq Logo" className="h-16" />
        </div>
        <div className="text-right">
          <h1 className="text-xl md:text-2xl font-bold text-[#8b2c4e]">
            نظام التوثيق الوطنـي
          </h1>
          <p className="text-xs text-gray-600">
            National Authentication System
          </p>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
