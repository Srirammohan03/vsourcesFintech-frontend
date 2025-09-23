import BankLayout, { BankLayoutProps } from "@/components/layout/BankLayout";
import { fetchBanks } from "@/components/ui/navbar";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Globe, University, Users } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const BankPage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useQuery<BankLayoutProps[]>({
    queryKey: ["bank"],
    queryFn: fetchBanks,
  });

  if (isError) {
    console.log("failed to fetch the banks", error);
    toast.error("failed to fetch the banks");
    return null;
  }

  if (isLoading) {
    return <BannerSkeleton />;
  }
  const bank = data.find((b: BankLayoutProps) => b.slug === slug);

  if (!bank) {
    return <p className="text-center py-10">Bank not found</p>;
  }

  return (
    <BankLayout
      background_image={bank?.background_image}
      title={bank?.title}
      subtitle={bank?.subtitle}
      interstRate={bank?.interstRate}
      serviceCharge={bank?.serviceCharge}
      marginRate={bank?.marginRate}
      bankImage={bank?.bankImage}
      description={bank?.description}
      trustedBy={bank?.trustedBy}
      documents={bank?.documents}
      eligibility={bank?.eligibility}
    />
  );
};

export default BankPage;
