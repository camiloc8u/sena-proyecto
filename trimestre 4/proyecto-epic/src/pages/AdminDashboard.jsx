<<<<<<< HEAD
import NavbarAdmin from "../components/admin/NavbarAdmin";

function AdminDashboard({ setVista}) {
  return (
    
<>
<NavbarAdmin />
</>
       
          


)      }
=======
import SidebarAdmin from "../components/dashboard/SidebarAdmin";
import TopbarAdmin from "../components/dashboard/TopbarAdmin";
import ResumenAdmin from "../components/dashboard/ResumenAdmin";
import TablaProductos from "../components/dashboard/TablaProductos";
import TablaPedidos from "../components/dashboard/TablaPedidos";

function AdminDashboard({ setVista}) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <SidebarAdmin />

      <div className="flex-grow-1">
        <TopbarAdmin setVista={setVista} />

        <main className="p-4">
          <ResumenAdmin />
          <TablaProductos />
          <TablaPedidos />
        </main>
      </div>
    </div>
  );
}
>>>>>>> origin/samuel

export default AdminDashboard;