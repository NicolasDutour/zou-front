import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './ProfileForm';

const Admin = async () => {
  return (
    <div className="p-6">
      <div>
        <h3 className="text-xl font-medium">Profil</h3>
        <p className="text-sm text-muted-foreground">
          Mettez à jour vos informations de connexion
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}

export default Admin