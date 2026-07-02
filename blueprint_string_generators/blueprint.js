async function jsonToBlueprintString(jsonString)
{
    // text to byte array
    const textEncoder = new TextEncoder();
    const jsonBytes = textEncoder.encode(jsonString);

    // compression
    const stream = new Blob([jsonBytes]).stream();
    const compressionStream = stream.pipeThrough(new CompressionStream("deflate"));
    const compressedBuffer = await new Response(compressionStream).arrayBuffer();
    const compressedBytes = new Uint8Array(compressedBuffer);

    // base64 conversion
    const binaryString = String.fromCharCode(...compressedBytes);
    return "0" + btoa(binaryString);
}

async function encodeAndOutputBlueprint(outputstring, targetobj)
{
    try
    {
        const encoded_outputstring = await jsonToBlueprintString(outputstring);
        document.getElementById(targetobj).textContent = encoded_outputstring;
    }
    catch (err)
    {
        console.error(err);
        document.getElementById(targetobj).textContent = "Error: " + err.message;
    }
}
