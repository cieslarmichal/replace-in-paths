import { FileSystemService } from '../../services/fileSystemService/fileSystemService.js';
import {
  ReplaceInPathNamesCommandHandler,
  ReplaceInPathNamesCommandHandlerPayload,
  ReplaceInPathNamesCommandHandlerResult,
} from './replaceInPathNamesCommandHandler.js';
import { CollectionService } from '../../services/collectionService/collectionService.js';
import { readdir } from 'fs/promises';

export class ReplaceInPathNamesCommandHandlerImpl implements ReplaceInPathNamesCommandHandler {
  public constructor(private readonly fileSystemService: FileSystemService) {}

  public async execute(
    payload: ReplaceInPathNamesCommandHandlerPayload,
  ): Promise<ReplaceInPathNamesCommandHandlerResult> {
    const { paths, replaceFrom, replaceTo } = payload;

    CollectionService.sortByLengthDescending({ data: paths });

    console.log({ paths });

    const changedPaths = new Map<string, string>();

    for (const path of paths) {
      if (path.search(replaceFrom) === -1) {
        continue;
      }

      const changedPath = path.replaceAll(replaceFrom, replaceTo);

      if (this.fileSystemService.checkIfPathExists({ path: changedPath })) {
        await this.fileSystemService.remove({ path });
      } else {
        console.log({ movedPath: path });

        const pathContents = await readdir(path);

        console.log({ pathContents });
        await this.fileSystemService.move({ fromPath: path, toPath: changedPath });
      }

      changedPaths.set(path, changedPath);
    }

    return { changedPaths };
  }
}
