import express from 'express';

const fs = require('fs')
const sharp = require('sharp')

export default function resize(path: string, format: string, width: number, height: number) {
    const readStream = fs.createReadStream(path)
    let transform = sharp()

    if (format) {
        transform = transform.toFormat(format)
    }

    if (width || height) {
        transform = transform.resize(width, height)
    }

    return readStream.pipe(transform)
}

