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
  const name = screen.getByPlaceholderText("İlhan");
  userEvent.type(name, "hi!");
  const error = await screen.findByTestId("error");
  expect(error).toBeInTheDocument();
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const button = screen.getByTestId("button");
  userEvent.click(button);
  const errors = await screen.findAllByTestId("error");
  expect(errors).toHaveLength(3);
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const name = screen.getByPlaceholderText("İlhan");
  userEvent.type(name, "Logan");
  const soyad = screen.getByPlaceholderText("Mansız");
  userEvent.type(soyad, "Roy");
  const button = screen.getByTestId("button");
  userEvent.click(button);
  const errors = await screen.findAllByTestId("error");
  expect(errors).toHaveLength(1);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const email = screen.getByPlaceholderText("yüzyılıngolcüsü@hotmail.com");
  userEvent.type(email, "gmail.com");
  const error = await screen.findByTestId("error");
  expect(error).toHaveTextContent("email geçerli bir email adresi olmalıdır.");
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const name = screen.getByPlaceholderText("İlhan");
  userEvent.type(name, "Logan");
  const email = screen.getByPlaceholderText("yüzyılıngolcüsü@hotmail.com");
  userEvent.type(email, "logan@royco.com");
  const button = screen.getByTestId("button");
  userEvent.click(button);
  const error = await screen.findByTestId("error");
  expect(error).toHaveTextContent("soyad gereklidir.");
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);
  const name = screen.getByPlaceholderText("İlhan");
  expect(name).toBeInTheDocument();
  userEvent.type(name, "hello!!");
  const soyad = screen.getByPlaceholderText("Mansız");
  expect(soyad).toBeInTheDocument();
  userEvent.type(soyad, "hi!");
  const email = screen.getByPlaceholderText("yüzyılıngolcüsü@hotmail.com");
  expect(email).toBeInTheDocument();
  userEvent.type(email, "h@gm.com");
  /* const errors = await screen.findAllByTestId("error");
  expect(errors).toHaveLength(0); */
  await waitFor(() => {
    expect(screen.queryAllByTestId("error")).toHaveLength(0);
  });
});
const testid = [
  "firstnameDisplay",
  "lastnameDisplay",
  "emailDisplay",
  "messageDisplay",
];
const info = ["logan", "roy", "logan@royco.com", "you are not serious people"];
test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<IletisimFormu />);
  userEvent.type(screen.getByPlaceholderText("İlhan"), info[0]);
  userEvent.type(screen.getByPlaceholderText("Mansız"), info[1]);
  userEvent.type(
    screen.getByPlaceholderText("yüzyılıngolcüsü@hotmail.com"),
    info[2]
  );
  userEvent.type(screen.getByTestId("message"), info[3]);
  const button = screen.getByTestId("button");
  userEvent.click(button);
  const firstName = await screen.findByTestId(testid[0]);
  expect(firstName).toBeInTheDocument();
  expect(firstName).toHaveTextContent(info[0]);
  const lastName = await screen.findByTestId(testid[1]);
  expect(lastName).toBeInTheDocument();
  expect(lastName).toHaveTextContent(info[1]);
  const email = await screen.findByTestId(testid[2]);
  expect(email).toBeInTheDocument();
  expect(email).toHaveTextContent(info[2]);
  const message = await screen.findByTestId(testid[3]);
  expect(message).toBeInTheDocument();
  expect(message).toHaveTextContent(info[3]);
});
