import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Swal from "sweetalert2";
import Clases from "../src/pages/Clases";

// Mock de componentes hijos
jest.mock("../src/components/dashboard/SidebarCliente", () => () => (
  <div data-testid="sidebar">Sidebar</div>
));

jest.mock("../src/components/ReservarClases", () => ({ agregarReserva }) => (
  <div>
    <span>Vista Reservar Clases</span>
    <button
      onClick={() =>
        agregarReserva({
          id: 101,
          nombre: "Spinning",
          horario: "07:00 AM",
          instructor: "Carlos",
        })
      }
    >
      Confirmar Reserva
    </button>
  </div>
));

// Mock de SweetAlert2
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Componente Clases", () => {
  const mockSetVista = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  test("permite abrir ReservarClases, agregar una clase y verla en la lista", () => {
    render(<Clases setVista={mockSetVista} />);

    expect(screen.getByText(/CLASES RESERVADAS/i)).toBeInTheDocument();

    // Abrir vista para reservar
    fireEvent.click(screen.getByText(/RESERVAR NUEVA CLASE/i));
    expect(screen.getByText(/Vista Reservar Clases/i)).toBeInTheDocument();

    // Agregar reserva y volver a la lista
    fireEvent.click(screen.getByText(/Confirmar Reserva/i));

    expect(screen.getByText("Spinning")).toBeInTheDocument();
    expect(screen.getByText(/07:00 AM • Carlos/i)).toBeInTheDocument();
  });

  test("cancela una clase cuando SweetAlert2 es confirmado", async () => {
    Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

    render(<Clases setVista={mockSetVista} />);

    // Primero agregamos una clase
    fireEvent.click(screen.getByText(/RESERVAR NUEVA CLASE/i));
    fireEvent.click(screen.getByText(/Confirmar Reserva/i));
    expect(screen.getByText("Spinning")).toBeInTheDocument();

    // Clic en CANCELAR
    fireEvent.click(screen.getByText(/CANCELAR/i));

    expect(Swal.fire).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByText("Spinning")).not.toBeInTheDocument();
    });
  });

  test("no cancela la clase si el usuario cancela el modal de SweetAlert2", async () => {
    Swal.fire.mockResolvedValueOnce({ isConfirmed: false });

    render(<Clases setVista={mockSetVista} />);

    fireEvent.click(screen.getByText(/RESERVAR NUEVA CLASE/i));
    fireEvent.click(screen.getByText(/Confirmar Reserva/i));

    fireEvent.click(screen.getByText(/CANCELAR/i));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText("Spinning")).toBeInTheDocument();
  });

  test("limpia sessionStorage y llama a setVista('home') al cerrar sesión", () => {
    sessionStorage.setItem("usuario", JSON.stringify({ id: 1 }));
    sessionStorage.setItem("token", "xyz");
    sessionStorage.setItem("token_time", "999");

    render(<Clases setVista={mockSetVista} />);

    fireEvent.click(screen.getByText(/Cerrar sesión/i));

    expect(sessionStorage.getItem("usuario")).toBeNull();
    expect(sessionStorage.getItem("token")).toBeNull();
    expect(sessionStorage.getItem("token_time")).toBeNull();
    expect(mockSetVista).toHaveBeenCalledWith("home");
  });
});