"use client";

import { createEdgeStoreProvider } from "@edgestore/react";

export const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider({
  maxConcurrentUploads: 2,
});
