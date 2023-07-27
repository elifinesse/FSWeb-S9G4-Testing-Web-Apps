import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
  const form = screen.getByTestId("iletisim-formu");
  expect(form).toBeInTheDocument();
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1).toBeInTheDocument();
  expect(h1).toHaveTextContent("İletişim Formu");
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const username = screen.getByPlaceholderText("İlhan");
  userEvent.type(username, "hi!");
  const error = await screen.findByTestId("error");
  expect(error).toBeInTheDocument();
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});
