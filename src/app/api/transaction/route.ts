import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handler GET: Ambil semua transaksi
export async function GET() {
  console.log("GET /api/transaction dipanggil");
  try {
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// Handler POST: Tambah transaksi baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request Body:", body); // ✅ Cek apakah data dikirim

    const { name, amount, status, date } = body;
    if (!name || !amount || !status || !date) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const amountFloat = parseFloat(amount);

    if (!name || isNaN(amountFloat) || !status || !date) {
      return NextResponse.json({ error: "Data tidak lengkap atau format salah" }, { status: 400 });
    }

    const formattedDate = new Date(date);
    if (!name || isNaN(amountFloat) || !status || isNaN(formattedDate.getTime())) {
      return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        name,
        amount: amountFloat, // ✅ Pastikan diubah ke Float
        status,
        date: formattedDate,
      },
    });

    console.log("Transaction Saved:", newTransaction); // ✅ Cek apakah berhasil tersimpan

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("Error saving transaction:", error); // ❌ Debug error
    return NextResponse.json({ error: "Gagal menambahkan transaksi", details: error }, { status: 500 });
  }
}

// delete function
export async function DELETE(req: Request) {
  try {
    const body = await req.json(); // Pastikan request memiliki body
    console.log("Request body:", body); // Debug log

    if (!body.id) {
      return NextResponse.json({ error: "ID transaksi tidak ditemukan" }, { status: 400 });
    }

    const deletedTransaction = await prisma.transaction.delete({
      where: { id: Number(body.id) }, // Pastikan ID bertipe number
    });

    return NextResponse.json({ message: "Transaksi berhasil dihapus", deletedTransaction }, { status: 200 });
  } catch (error) {
    console.error("Error saat menghapus transaksi:", error);
    return NextResponse.json({ error: "Gagal menghapus transaksi" }, { status: 500 });
  }
}

// handle update transaksi
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body untuk update:", body);

    const { id, name, amount, status, date } = body;

    if (!id) {
      return NextResponse.json({ error: "ID transaksi tidak ditemukan" }, { status: 400 });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        name,
        amount: Number(amount), // Pastikan diubah ke Number
        status,
        date: new Date(date), // Pastikan format date valid
      },
    });

    return NextResponse.json({ message: "Transaksi berhasil diperbarui", updatedTransaction }, { status: 200 });
  } catch (error) {
    console.error("Error saat mengupdate transaksi:", error);
    return NextResponse.json({ error: "Gagal mengupdate transaksi" }, { status: 500 });
  }

}
