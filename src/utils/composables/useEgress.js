import { ref } from "vue";
import { fetchEgresses, deleteEgress } from "../egressService";
import { useQuasar } from "quasar";

export const useEgress = () => {
  const egresses = ref([]);
  const $q = useQuasar();

  const loadEgresses = async () => {
    try {
      const response = await fetchEgresses();
      egresses.value = response.data;
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to fetch egresses",
      });
    }
  };

  const removeEgress = async (id, deleteAllRelated) => {
    try {
      await deleteEgress(id, deleteAllRelated);
      $q.notify({
        type: "positive",
        message: `Egress${deleteAllRelated ? 'es' : ''} deleted successfully`,
      });
      loadEgresses();
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to delete egress",
      });
    }
  };

  return {
    egresses,
    loadEgresses,
    removeEgress,
  };
};
