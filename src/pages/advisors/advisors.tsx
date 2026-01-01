import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TUser } from "@/types/TUser";
import { getHttp, postHttp } from "@/helpers/httpHelpers";
import { endpoints } from "@/config/endpoints";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/dataTable";
import { columns } from "@/components/advisors/columns";
import { DataTableToolbar } from "@/components/advisors/dataTableToolbar";
import { alertDialog, alertSuccessTimer, alertError } from "@/helpers/alertHandler";
import Modal from "@/components/modal";
import Form from "@/components/advisors/form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe contener mínimo 2 caracteres"
  }).max(50, {
    message: "El nombre debe ser máximo de 50 careacteres"
  }),
  lastName: z.string().min(2, {
    message: "El apellido debe contener mínimo 2 caracteres"
  }).max(50, {
    message: "El apellido debe ser máximo de 50 caracteres"
  }),
  email: z.string().email({ message: "Debe ingresar un correo válido" }),
  cellphone: z.string().min(10, {
    message: "El celular debe ser mínimo de 10 caracteres"
  }).max(11, {
    message: "El celular debe ser máximo de 11 caracteres"
  }),
  address: z.string().min(5, {
    message: "La dirección debe ser mínimo de 5 caracteres"
  }).max(30, {
    message: "La dirección debe ser máximo de 5 caracteres"
  }),
  password: z.string()
});

export function Advisors() {
  const [advisors, setAdvisors] = useState<TUser[]>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      cellphone: "",
      address: "",
      password: "",
    }
  });

  const handleFetchAdvisors = async () => {
    getHttp(endpoints.users)
      .then(response => {
        setAdvisors(response);
      });
  }

  useEffect(() => {
    handleFetchAdvisors();
  }, []);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (advisors.find((advisor: TUser) => advisor.email === values.email.trim())) {
      alertError(`El asesor con correo ${values.email} ya existe`);
      return;
    }

    const newAdvisor = { ...values, roles: [{ roleName: 'advisor' }] }

    alertDialog("Deseas continuar con la creación del asesor?", "Nuevo Asesor")
      .then(result => {
        if (result.isConfirmed) {
          postHttp(`${endpoints.users}`, newAdvisor)
            .then(response => {
              if (response.statusCode && response.statusCode !== 201) {
                alertError("Ha ocurrido un error creando el asesor");
                return;
              }

              alertSuccessTimer(`Se ha creado al asesor ${response.name} ${response.lastName}`);
              form.reset();
              handleFetchAdvisors();
            });
        }
      });
  }

  return <>
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold md:text-2xl">Asesores</h1>
      <Modal
        title="Crear Asesor"
        openTriggerValue="Crear Asesor"
        description="Formulario para la creación de un nuevo asesor"
      >
        <Form form={form} handleSubmit={handleSubmit} />
      </Modal>
    </div>
    {advisors &&
      <Card>
        <CardContent className="pt-5">
          <DataTable data={advisors} columns={columns} DataTableToolbar={DataTableToolbar} />
        </CardContent>
      </Card>
    }
  </>
}
