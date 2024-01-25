import { CsvBuilder } from "filefy";
import GeoJson from "geojsonjs";
import { Coordinates } from "../redux/slices/selected-coordinates";

export function exportCoordinatesAsCsv(coordinates: Coordinates[]): void {
  const rows = coordinates.map((coordinate, coordinateIdx) => [
    (coordinateIdx + 1).toString(),
    coordinate.latitude.toString(),
    coordinate.longitude.toString(),
  ]);

  new CsvBuilder("coordinates.csv")
    .setColumns(["id", "latitude", "longitude"])
    .addRows(rows)
    .exportFile();
}

export function createExportableGeoJsonAsEncodedUriComponent(coordinates: Coordinates[]): string {
  const geojson = GeoJson.parse(coordinates, { Point: ["latitude", "longitude"] });

  return encodeURIComponent(JSON.stringify(geojson, undefined, 2));
}
