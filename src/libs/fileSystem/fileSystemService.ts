export interface CheckIfPathIsDirectoryPayload {
  readonly path: string;
}

export interface CheckIfPathIsFilePayload {
  readonly path: string;
}

export interface CheckIfPathExistsPayload {
  readonly path: string;
}

export interface GetAllPathsFromDirectoryPayload {
  readonly directoryPath: string;
}

export interface MovePayload {
  readonly fromPath: string;
  readonly toPath: string;
}

export interface RemovePayload {
  readonly path: string;
}

export interface FileSystemService {
  checkIfPathIsDirectory(payload: CheckIfPathIsDirectoryPayload): boolean;
  checkIfPathIsFile(payload: CheckIfPathIsFilePayload): boolean;
  checkIfPathExists(payload: CheckIfPathExistsPayload): boolean;
  getAllPathsFromDirectory(payload: GetAllPathsFromDirectoryPayload): Promise<string[]>;
  move(payload: MovePayload): Promise<void>;
  remove(payload: RemovePayload): Promise<void>;
}