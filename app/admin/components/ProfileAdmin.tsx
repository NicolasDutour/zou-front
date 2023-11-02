"use client"

import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProfileForm } from './ProfileForm';

export default function ProfileAdmin() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Profil</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Mettez à jour vos informations de connexion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Separator />
        <ProfileForm />
      </CardContent>
    </Card>
  )
}