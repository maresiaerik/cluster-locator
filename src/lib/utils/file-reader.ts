import type { FeatureCollection, Point } from "geojson";
import gjv from "geojson-validation";
import { ClusterData } from "../redux/slices/cluster-data";

type GetFeatureCollectionFromUploadedFileOptions = {
  file: File;
  onError: (string: any) => void;
  onRead: (file: ClusterData) => void;
};

export default function readAndValidateUploadedFile({
  file,
  onError,
  onRead,
}: GetFeatureCollectionFromUploadedFileOptions): void {
  const reader = new FileReader();

  reader.onload = (): void => {
    try {
      const fileTextContent = reader.result as string;
      const fileObject = JSON.parse(fileTextContent) as FeatureCollection<Point>;

      if (!gjv.valid(fileObject)) {
        onError("File is not valid GeoJSON");
        return;
      }

      if (!gjv.isFeatureCollection(fileObject)) {
        onError("File is not a valid GeoJSON FeatureCollection");
        return;
      }

      if (!areAllFeaturesInFeatureCollectionGeoJsonPoints(fileObject)) {
        onError("All features in the FeatureCollection must be of type Point");
        return;
      }

      onRead({
        name: file.name,
        data: fileObject,
      });
    } catch (e) {
      onError("Error uploading file. Please try again");
    }
  };

  reader.readAsText(file);
}

function areAllFeaturesInFeatureCollectionGeoJsonPoints(
  featureCollection: FeatureCollection,
): boolean {
  return featureCollection.features.every((feature) => feature.geometry.type === "Point");
}
