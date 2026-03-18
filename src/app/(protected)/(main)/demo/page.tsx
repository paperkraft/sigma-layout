'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { CheckboxController } from '@/components/form-controls/floating/checkbox-controller';
import { FloatingDateController } from '@/components/form-controls/floating/datepicker-controller';
import { FloatingInputController } from '@/components/form-controls/floating/input-controller';
import { RadioButtonController } from '@/components/form-controls/floating/radiobutton-controller';
import { FloatingSelectController } from '@/components/form-controls/floating/select-controller';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FloatingTextareaController } from '@/components/form-controls/floating/textarea-controller';

const sampleSchema = z.object({
    title: z.string().min(1, "Select title"),
    name: z.string().min(4, "Enter a valid name"),
    address: z.string().min(10, "Enter a valid address"),
    mobile: z.string().min(10, "Enter a valid mobile no."),
    dateOfBirth: z.string().min(1, "Enter a valid date"),
    gender: z.string().min(1, "Select a valid gender"),
    term: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms",
    }),
})

type SampleFormValues = z.infer<typeof sampleSchema>;

const defaultValues: SampleFormValues = {
    title: "",
    name: "",
    address: "",
    mobile: "",
    dateOfBirth: "",
    gender: "",
    term: false,
}

const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "Other" },
]

const titleOptions = [
    { label: "Mr.", value: "Mr" },
    { label: "Ms.", value: "Ms" },
    { label: "Mrs.", value: "Mrs" },
]

export default function DummyForm() {

    // default form setup
    const [formData, setFormData] = useState<SampleFormValues>(defaultValues);

    const handleSubmit = useCallback(async (data: SampleFormValues) => {
        if (!data.term) {
            alert("Please accept terms");
            return
        }

        alert(JSON.stringify(data, null, 2));
    }, [])

    const resetForm = () => setFormData(defaultValues)

    // RHF setup ----------------
    const form = useForm<SampleFormValues>({
        resolver: zodResolver(sampleSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = useCallback(async (data: SampleFormValues) => {
        alert(JSON.stringify(data, null, 2));
    }, []);

    return (
        <div className='p-6 space-y-1'>
            <PageHeader title='Demo page' description='Sample form comparision' />
            <div className='max-w-2xl mx-auto p-6 bg-card rounded-md shadow-md border'>
                <div className='flex gap-8'>
                    {/* Regular form */}
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(formData) }} className="space-y-4 w-full">
                        <h6>Regular Form</h6>
                        <FloatingSelectController
                            disableRHF
                            name='title'
                            label='Title'
                            options={titleOptions}
                            value={formData.title}
                            onValueChange={(v) => setFormData((pre) => ({ ...pre, title: v }))}
                        />

                        <FloatingInputController
                            disableRHF
                            name='name'
                            label='Name'
                            placeholder='Enter name'
                            reset
                            value={formData.name}
                            onChange={(e) => setFormData((pre) => ({ ...pre, name: e.target.value }))}
                            onResetClick={() => setFormData((prev) => ({ ...prev, name: "" }))}
                        />

                        <FloatingTextareaController
                            disableRHF
                            name='address'
                            label='Address'
                            placeholder='Enter address'
                            reset
                            value={formData.address}
                            onChange={(e) => setFormData((pre) => ({ ...pre, address: e.target.value }))}
                            onResetClick={() => setFormData((prev) => ({ ...prev, address: "" }))}
                        />

                        <FloatingInputController
                            disableRHF
                            type='tel'
                            name='mobile'
                            label='Mobile No.'
                            placeholder='Enter mobile no.'
                            maxLength={10}
                            reset
                            value={formData.mobile}
                            onChange={(e) => setFormData((pre) => ({ ...pre, mobile: e.target.value }))}
                            onResetClick={() => setFormData((prev) => ({ ...prev, mobile: "" }))}
                        />

                        <FloatingDateController
                            disableRHF
                            name='dateOfBirth'
                            label='Date of birth'
                            value={formData.dateOfBirth}
                            onDateChange={(v) => setFormData((pre) => ({ ...pre, dateOfBirth: v }))}
                        />

                        <RadioButtonController
                            disableRHF
                            name="gender"
                            label="Gender"
                            options={genderOptions}
                            value={formData.gender}
                            onValueChange={(v) => setFormData((pre) => ({ ...pre, gender: v }))}
                        />

                        <CheckboxController
                            disableRHF
                            name='term'
                            label='I accept the terms'
                            checked={formData.term}
                            onCheckedChange={(v) => setFormData((pre) => ({ ...pre, term: v }))}
                        />

                        <div className='flex gap-2'>
                            <Button type='button' variant={'outline'} onClick={resetForm}>Reset</Button>
                            <Button type='submit'>Submit</Button>
                        </div>
                    </form>

                    {/* RHF */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                            <h6>React Hook Form <span className='text-xs'>(with zod validation)</span></h6>
                            <FloatingSelectController
                                name='title'
                                label='Title'
                                options={titleOptions}
                            />

                            <FloatingInputController
                                name='name'
                                label='Name'
                                placeholder='Enter name'
                                reset
                            />

                            <FloatingTextareaController
                                name='address'
                                label='Address'
                                placeholder='Enter address'
                                reset
                            />

                            <FloatingInputController
                                type='tel'
                                name='mobile'
                                label='Mobile No.'
                                placeholder='Enter mobile no.'
                                minLength={10}
                                maxLength={10}
                                reset
                            />

                            <FloatingDateController
                                name='dateOfBirth'
                                label='Date of birth'
                            />

                            <RadioButtonController
                                name="gender"
                                label='Gender'
                                options={genderOptions}
                            />

                            <CheckboxController
                                name='term'
                                label='I accept the terms'
                            />

                            <div className='flex gap-2'>
                                <Button type='button' onClick={() => form.reset()} variant={'outline'}>Reset</Button>
                                <Button type='submit'>Submit</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}