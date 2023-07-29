import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};

	return (
		<Card>
			<Title>Create new user</Title>
			<form className="" onSubmit={handleSubmit}>
				<TextInput name="name" placeholder="Nombre del usuario" />
				<TextInput name="email" placeholder="Correo electrónico" />
				<TextInput name="github" placeholder="Github" />

				<div>
					<Button type="submit" className="mt-2">
						Crear usuario
					</Button>
					<span>
						{result === "ok" && (
							<Badge color="green">Guardado correctamente</Badge>
						)}
						{result === "ko" && <Badge color="red">Error al guardar</Badge>}
					</span>
				</div>
			</form>
		</Card>
	);
}
