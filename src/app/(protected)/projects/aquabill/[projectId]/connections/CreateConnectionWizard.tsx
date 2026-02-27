'use client'

import { Check, ChevronLeft, ChevronRight, FileText, MapPin, X, Zap } from 'lucide-react';
import React, { useState } from 'react';

import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

// --- Shared Form Helpers ---

const FieldLabel = ({ children, required }: { children: React.ReactNode, required?: boolean }) => (
    <Label className="mb-2 block font-medium">
        {children} {required && <span className="text-destructive">*</span>}
    </Label>
);

const FormSelect = ({ options, placeholder, value, onChange }: any) => (
    <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            {options.map((opt: string) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
        </SelectContent>
    </Select>
);

// --- Main Application Component ---

export default function CreateConnectionWizard() {
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Connection
        appNo: '', appDate: '', connDate: '', type: 'New',
        fName: '', mName: '', lName: '',
        countryCode: '+91', mobile: '', landline: '',
        email: '', pincode: '', address: '',
        billingMethod: 'Meter', zone: '', buildingType: '', connSize: '', connType: '',

        // Step 2: Meter
        meterNo: '', meterMake: '', initReading: '0', readingDate: '',
        leastCount: '1', consumptionUnit: 'Liters', ownership: '',

        // Step 3: Property
        gisBuildingId: '', gisPropertyId: '', propBuildingType: '', buildingArea: '', buildingNo: ''
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // UX Logic: Only show Meter step if billing method is Meter
    const steps = [
        { id: 1, title: 'Connection Details', icon: FileText },
        ...(formData.billingMethod === 'Meter' ? [{ id: 2, title: 'Meter Details', icon: Zap }] : []),
        { id: 3, title: 'Property Details', icon: MapPin }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === activeStep);
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    const handleNext = () => {
        if (!isLastStep) setActiveStep(steps[currentStepIndex + 1].id);
    };

    const handlePrev = () => {
        if (!isFirstStep) setActiveStep(steps[currentStepIndex - 1].id);
    };

    return (
        <div className="w-full overflow-hidden flex flex-col">
            {/* Stepper Navigation */}
            <div className="bg-muted/30 border-y border-border px-5 py-2">
                <div className="flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
                    {steps.map((step, index) => {
                        const isActive = step.id === activeStep;
                        const isPast = steps.findIndex(s => s.id === activeStep) > index;

                        return (
                            <React.Fragment key={step.id}>
                                <div
                                    onClick={() => setActiveStep(step.id)}
                                    className={`flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap px-3 py-2 rounded-lg ${isActive ? 'bg-primary/10 text-primary' :
                                        isPast ? 'text-foreground hover:bg-muted' : 'text-muted-foreground hover:bg-muted'
                                        }`}
                                >
                                    <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${isActive ? 'bg-primary text-primary-foreground' :
                                        isPast ? 'bg-foreground text-background' : 'bg-muted-foreground/20 text-muted-foreground'
                                        }`}>
                                        {isPast ? <Check className="w-4 h-4" /> : index + 1}
                                    </div>
                                    <span className="font-semibold text-sm">{step.title}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground/30 shrink-0" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Form Content Area */}
            <div className="p-4 md:p-5 overflow-y-auto max-h-[65vh] bg-background/50">

                {/* STEP 1: CONNECTION DETAILS */}
                {activeStep === 1 && (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                        <Accordion
                            type="multiple"
                            defaultValue={['app-info', 'applicant-details', 'conn-config']}
                            className="space-y-4"
                        >
                            {/* Section 1 */}
                            <AccordionItem value="app-info" className="border border-border rounded-md bg-card overflow-hidden">
                                <AccordionTrigger className="px-5 py-4 bg-muted hover:bg-muted/50 hover:no-underline border-b border-border rounded-b-none data-[state=closed]:border-none">
                                    <span className="font-semibold text-sm tracking-wide">1. Application Information</span>
                                </AccordionTrigger>
                                <AccordionContent className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <FieldLabel required>Application No</FieldLabel>
                                            <Input placeholder="Enter Application No" value={formData.appNo} onChange={(e) => handleChange('appNo', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Application Received Date</FieldLabel>
                                            <Input type="date" value={formData.appDate} onChange={(e) => handleChange('appDate', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Connection Date</FieldLabel>
                                            <Input type="date" value={formData.connDate} onChange={(e) => handleChange('connDate', e.target.value)} />
                                        </div>
                                        <div className="md:col-span-3">
                                            <FieldLabel required>Connection Origin</FieldLabel>
                                            <RadioGroup
                                                value={formData.type}
                                                onValueChange={(val: any) => handleChange('type', val)}
                                                className="flex gap-6 mt-2"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="New" id="r1" />
                                                    <Label htmlFor="r1" className="cursor-pointer font-normal">New Connection</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Migrated" id="r2" />
                                                    <Label htmlFor="r2" className="cursor-pointer font-normal">Migrate (old) Connection</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Section 2 */}
                            <AccordionItem value="applicant-details" className="border border-border rounded-md bg-card overflow-hidden">
                                <AccordionTrigger className="px-5 py-4 bg-muted/30 hover:bg-muted/50 hover:no-underline border-b border-border rounded-b-none data-[state=closed]:border-none">
                                    <span className="font-semibold text-sm tracking-wide">2. Applicant & Contact Details</span>
                                </AccordionTrigger>
                                <AccordionContent className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <FieldLabel required>First Name</FieldLabel>
                                            <Input placeholder="Enter First Name" value={formData.fName} onChange={(e) => handleChange('fName', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Middle Name</FieldLabel>
                                            <Input placeholder="Enter Middle Name" value={formData.mName} onChange={(e) => handleChange('mName', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Last Name</FieldLabel>
                                            <Input placeholder="Enter Last Name" value={formData.lName} onChange={(e) => handleChange('lName', e.target.value)} />
                                        </div>

                                        <div>
                                            <FieldLabel required>Country Code</FieldLabel>
                                            <FormSelect placeholder="Select Code" options={['+91', '+1', '+44']} value={formData.countryCode} onChange={(val: string) => handleChange('countryCode', val)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Mobile No</FieldLabel>
                                            <Input placeholder="Enter Mobile No" type="tel" value={formData.mobile} onChange={(e) => handleChange('mobile', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel>Landline No</FieldLabel>
                                            <Input placeholder="Enter Landline No" value={formData.landline} onChange={(e) => handleChange('landline', e.target.value)} />
                                        </div>

                                        <div>
                                            <FieldLabel required>Email Id</FieldLabel>
                                            <Input placeholder="Enter Email Id" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Pincode</FieldLabel>
                                            <Input placeholder="Enter Pincode" value={formData.pincode} onChange={(e) => handleChange('pincode', e.target.value)} />
                                        </div>
                                        <div className="md:col-span-3">
                                            <FieldLabel required>Address</FieldLabel>
                                            <Input placeholder="Enter Full Address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Section 3 */}
                            <AccordionItem value="conn-config" className="border border-border rounded-md bg-card overflow-hidden last:border">
                                <AccordionTrigger className="px-5 py-4 bg-muted/30 hover:bg-muted/50 hover:no-underline border-b border-border rounded-b-none data-[state=closed]:border-none">
                                    <span className="font-semibold text-sm tracking-wide">3. Connection Configuration</span>
                                </AccordionTrigger>
                                <AccordionContent className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <FieldLabel required>Billing Method</FieldLabel>
                                            <FormSelect placeholder="Select Method" options={['Meter', 'Flat']} value={formData.billingMethod} onChange={(val: string) => handleChange('billingMethod', val)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Zone</FieldLabel>
                                            <FormSelect placeholder="Select Zone" options={['North', 'South', 'East', 'West']} value={formData.zone} onChange={(val: string) => handleChange('zone', val)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Building Type</FieldLabel>
                                            <FormSelect placeholder="Select Building Type" options={['Apartment', 'Independent', 'Commercial']} value={formData.buildingType} onChange={(val: string) => handleChange('buildingType', val)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Connection Size</FieldLabel>
                                            <FormSelect placeholder="Select Size" options={['0.5 Inch', '1.0 Inch', '1.5 Inch']} value={formData.connSize} onChange={(val: string) => handleChange('connSize', val)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Connection Type</FieldLabel>
                                            <FormSelect placeholder="Select Type" options={['Domestic', 'Commercial', 'Industrial']} value={formData.connType} onChange={(val: string) => handleChange('connType', val)} />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}

                {/* STEP 2: METER DETAILS */}
                {activeStep === 2 && (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                        <Accordion type="single" defaultValue="meter-details" collapsible>
                            <AccordionItem value="meter-details" className="border border-border rounded-md bg-card overflow-hidden last:border">
                                <AccordionTrigger className="px-5 py-4 bg-muted/30 hover:bg-muted/50 hover:no-underline border-b border-border rounded-b-none data-[state=closed]:border-none">
                                    <span className="font-semibold text-sm tracking-wide">Meter Hardware Details</span>
                                </AccordionTrigger>
                                <AccordionContent className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <FieldLabel required>Meter No</FieldLabel>
                                            <Input placeholder="Enter Meter No" value={formData.meterNo} onChange={(e) => handleChange('meterNo', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel>Meter Make</FieldLabel>
                                            <Input placeholder="Enter Meter Make" value={formData.meterMake} onChange={(e) => handleChange('meterMake', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Initial Meter Reading</FieldLabel>
                                            <Input type="number" placeholder="0" value={formData.initReading} onChange={(e) => handleChange('initReading', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Meter Reading Date</FieldLabel>
                                            <Input type="date" value={formData.readingDate} onChange={(e) => handleChange('readingDate', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Meter Least Count</FieldLabel>
                                            <Input type="number" placeholder="1" value={formData.leastCount} onChange={(e) => handleChange('leastCount', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel>Consumption Unit</FieldLabel>
                                            <FormSelect placeholder="Select Unit" options={['Liters', 'Gallons', 'Cubic Meters']} value={formData.consumptionUnit} onChange={(val: string) => handleChange('consumptionUnit', val)} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <FieldLabel>Ownership</FieldLabel>
                                            <Input placeholder="Enter Ownership Details" value={formData.ownership} onChange={(e) => handleChange('ownership', e.target.value)} />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}

                {/* STEP 3: PROPERTY DETAILS */}
                {activeStep === 3 && (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                        <Accordion type="single" defaultValue="prop-details" collapsible>
                            <AccordionItem value="prop-details" className="border border-border rounded-xl bg-card overflow-hidden last:border">
                                <AccordionTrigger className="px-5 py-4 bg-muted/30 hover:bg-muted/50 hover:no-underline border-b border-border rounded-b-none data-[state=closed]:border-none">
                                    <span className="font-semibold text-sm tracking-wide">Geographic & Property Information</span>
                                </AccordionTrigger>
                                <AccordionContent className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <FieldLabel>GIS Building Id</FieldLabel>
                                            <Input placeholder="Enter GIS Building Id" value={formData.gisBuildingId} onChange={(e) => handleChange('gisBuildingId', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel>GIS Property Id</FieldLabel>
                                            <Input placeholder="Enter GIS Property Id" value={formData.gisPropertyId} onChange={(e) => handleChange('gisPropertyId', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel required>Building Type</FieldLabel>
                                            <FormSelect placeholder="Select Building Type" options={['Apartment', 'Independent Villa', 'Commercial Complex', 'Slum']} value={formData.propBuildingType} onChange={(val: string) => handleChange('propBuildingType', val)} />
                                        </div>
                                        <div>
                                            <FieldLabel>Building Area (Sq.Ft)</FieldLabel>
                                            <Input type="number" placeholder="Enter Area" value={formData.buildingArea} onChange={(e) => handleChange('buildingArea', e.target.value)} />
                                        </div>
                                        <div>
                                            <FieldLabel>Building No / Plot No</FieldLabel>
                                            <Input placeholder="Enter Building No" value={formData.buildingNo} onChange={(e) => handleChange('buildingNo', e.target.value)} />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}

            </div>

            {/* Footer Actions */}
            <div className="px-6 py-5 border-t border-border bg-muted/20 flex justify-between items-center rounded-b-2xl mt-auto">
                <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={isFirstStep}
                    className={`${isFirstStep ? 'opacity-0 pointer-events-none' : ''}`}
                >
                    <ChevronLeft /> Previous
                </Button>

                <Button
                    onClick={isLastStep ? () => alert('Form Submitted!\n' + JSON.stringify(formData, null, 2)) : handleNext}
                >
                    {isLastStep ? 'Submit Application' : 'Next Step'}
                    {!isLastStep && <ChevronRight />}
                </Button>
            </div>

        </div>
    );
}