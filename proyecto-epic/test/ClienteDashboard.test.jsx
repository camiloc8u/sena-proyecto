import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClienteDashboard from "../src/pages/ClienteDashboard";

// Fíjate en las rutas apuntando a ../src/components/...
jest.mock("../src/components/dashboard/SidebarCliente", () => () => (
  <div data-testid="sidebar">Sidebar</div>
));

jest.mock("../src/components/CambiarPlan", () => ({ agregarReserva }) => (
  <button onClick={() => agregarReserva({ nombre: "BÁSICO" })}>
    Confirmar Plan Básico
  </button>
));

describe("ClienteDashboard", () => {
  const mockSetVista = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    global.fetch = jest.fn();
  });

  test("muestra 'Cargando...' inicialmente y luego renderiza los datos del usuario", async () => {
    sessionStorage.setItem(
      "usuario",
      JSON.stringify({
        idusuario: "1",
        primer_nombre: "Samuel",
        primer_apellido: "Manrique",
        correo: "samuel@correo.com",
      })
    );

    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        id: "1",
        telefono: "3001234567",
        sesionesRestantes: "5",
      }),
    });

    render(<ClienteDashboard setVista={mockSetVista} />);

    // Estado inicial de carga
    expect(screen.getByText(/Cargando\.\.\./i)).toBeInTheDocument();

    // Espera a que termine el fetch y aparezca el saludo
    await waitFor(() => {
      expect(screen.getByText(/Bienvenido, Samuel Manrique/i)).toBeInTheDocument();
    });

    expect(screen.getByText("3001234567")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("limpia sessionStorage y navega a 'home' al cerrar sesión", async () => {
    sessionStorage.setItem(
      "usuario",
      JSON.stringify({
        idusuario: "1",
        primer_nombre: "Samuel",
        primer_apellido: "Manrique",
        correo: "samuel@correo.com",
      })
    );
    sessionStorage.setItem("token", "abc123");
    sessionStorage.setItem("token_time", "123456");

    global.fetch.mockResolvedValueOnce({
      json: async () => ({ id: "1", telefono: "3001234567" }),
    });

    render(<ClienteDashboard setVista={mockSetVista} />);

    await waitFor(() => {
      expect(screen.getByText(/Cerrar sesión/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Cerrar sesión/i));

    expect(sessionStorage.getItem("usuario")).toBeNull();
    expect(sessionStorage.getItem("token")).toBeNull();
    expect(sessionStorage.getItem("token_time")).toBeNull();
    expect(mockSetVista).toHaveBeenCalledWith("home");
  });
});