import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import Panel from "../panel"
import { contactOptions } from "./helpers"

export enum Contact {
    Signal = "SIGNAL",
    Email = "EMAIL",
    Github = "GITHUB",
}

type FormSchema = {
    contact: Contact
    signalNumber?: string
    email?: string
    github?: string
}

const WatcherForm: React.FC = () => {
    const [result, setResult] = useState<FormSchema | null>(null)

    const { register, handleSubmit, errors, watch } = useForm<FormSchema>({
        defaultValues: {
            signalNumber: "+39 333 444 5555",
        },
    })
    const contactWatch = watch("contact", undefined)
    const onSubmit = handleSubmit((data) => setResult(data))

    return (
        <Panel summary={<Summary />}>
            <Form onSubmit={onSubmit} className="m-3" autoComplete="off">
                <div>
                    <label>Contatto</label>
                    <Form.Control
                        as="select"
                        name="contact"
                        isInvalid={!!errors.contact}
                        ref={register({ required: true })}
                    >
                        {contactOptions.map((x) => (
                            <option key={x.value} value={x.value}>
                                {x.label}
                            </option>
                        ))}
                    </Form.Control>
                    {errors.contact && <small className="text-danger">Campo obbligatorio</small>}
                </div>

                {contactWatch === Contact.Email && (
                    <div>
                        <label>Email</label>
                        <Form.Control name="email" isInvalid={!!errors.email} ref={register({ required: true })} />
                        {errors.email && <small className="text-danger">Campo obbligatorio</small>}
                    </div>
                )}

                {contactWatch === Contact.Signal && (
                    <div>
                        <label>Numero signal</label>
                        <Form.Control
                            name="signalNumber"
                            isInvalid={!!errors.signalNumber}
                            ref={register({ required: true })}
                        />
                        {errors.signalNumber && <small className="text-danger">Campo obbligatorio</small>}
                    </div>
                )}

                {contactWatch === Contact.Github && (
                    <div>
                        <label>Username github</label>
                        <Form.Control
                            name="github"
                            isInvalid={!!errors.github}
                            ref={register({
                                required: true,
                                pattern: { value: /^@/, message: "Deve iniziare con @" },
                            })}
                        />
                        {errors.github && (
                            <small className="text-danger">{errors.github?.message || "Campo obbligatorio"}</small>
                        )}
                    </div>
                )}

                <div className="mt-3 d-flex justify-content-between">
                    <Button variant="primary" type="submit">
                        Invia
                    </Button>
                </div>
            </Form>

            {result && <p className="mt-3 alert alert-success">{JSON.stringify(result)}</p>}
        </Panel>
    )
}

const Summary: React.FC = () => (
    <>
        <p className="mb-1">- All feature from simple form</p>
        <p className="mb-1">- Initial values</p>
        <p className="mb-1">- Dynamic form fields with watchers</p>
        <p className="mb-1">
            -{" "}
            <a href="https://react-hook-form.com/advanced-usage#ErrorMessages">
                Error message for specific validation error
            </a>
        </p>
    </>
)

export default WatcherForm
