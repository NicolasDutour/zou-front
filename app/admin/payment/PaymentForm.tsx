"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { capitalize } from "@/lib/utils";
import { IconContext } from "react-icons";
import { AiFillLock } from "react-icons/ai";
import { MdPayment } from "react-icons/md";

export default function PaymentMethod() {
  const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

  return (
    <Card>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary [&:has([data-state=checked])]:border-secondary"
            >
              <IconContext.Provider value={{ className: "text-3xl" }}>
                <div>
                  <MdPayment />
                </div>
              </IconContext.Provider>
              Card
            </Label>
          </div>
        </RadioGroup>
        <div className="grid gap-2">
          <Label htmlFor="name">Fullname displayed on the card</Label>
          <Input id="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Card number</Label>
          <Input id="number" placeholder="" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Expires</Label>
            <Select>
              <SelectTrigger id="month">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => <SelectItem className="cursor-pointer" value={`${index + 1}`}> {capitalize(month)} </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Select>
              <SelectTrigger id="year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="CVC" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="block">
        <Button className="w-full bg-secondary">Continue</Button>
        <div className="flex items-center mt-2">
          <AiFillLock />
          <p className="ml-2">Votre carte est chiffrée et enregistrée par notre partenaire Stripe</p>
        </div>
      </CardFooter>
    </Card>
  )
}