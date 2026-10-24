import {Router} from 'express';
import {noteService} from '../index.js';
import {successResponse, errorResponse} from '../../common/utils/index.js';
export const noteRouter = Router();

//createNote
noteRouter.post("/", async (req, res) => {
    try {
        await noteService.createNote({data: req.body});
        return successResponse(res, "Note created");
    } catch (error) {
        return errorResponse(res, error.message);
    }
})
//getNoteByContent
noteRouter.get("/note-by-content", async (req, res) => {
    try{
        const note =await noteService.getNoteByContent({
            userId: req.query.userId,
            content: req.query.content,
        });
        return res.status(200).json({
            id: note._id,
            title: note.title,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        });
    }catch(error){
        const status = error.message === "Note not found" ? 404 : 403;
        return errorResponse(res, error.message, status);
    }
})

//updateTitleByUser
noteRouter.patch("/all", async (req, res) => {
    try {
        const result = await noteService.updateTitleByUser({
            userId: req.query.userId,
            title: req.body.title,
        });
        return successResponse(res, "All Notes updated");
    } catch (error) {
        const status = error.message === "No Notes found" ? 404 : 403;
        return errorResponse(res, error.message, status);
    }
});  
   

//updateNote
noteRouter.patch("/:noteId", async (req, res) => {
    try {
        const note =await noteService.updateNote({
            noteId: req.params.noteId,
            data: req.body,
            userId: req.query.userId,
        });
        return res.status(200).json({
            message: "updated",
            note: {
                id: note._id,
                title: note.title,
                content: note.content,
                userId: note.userId,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
            },
        });
    } catch (error) {
        const status = error.message === "Note not found" ? 404 : 403;
        return errorResponse(res, error.message, status);
    }
})
//replaceNote
noteRouter.put("/replace/:noteId", async (req, res) => {
    try {
        const note =await noteService.replaceNote({
            noteId: req.params.noteId,
            data: req.body,
            userId: req.query.userId,
        });
        return res.status(200).json({
            note: {
                id: note._id,
                title: note.title,
                content: note.content,
                userId: note.userId,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
            },
        });
    } catch (error) {
        const status = error.message === "Note not found" ? 404 : 403;
        return errorResponse(res, error.message, status);
    }
})

//deleteNote
noteRouter.delete("/:noteId", async (req, res) => {
    try {
        const note =await noteService.deleteNote({
            noteId: req.params.noteId,
            userId: req.query.userId,
        });
        return res.status(200).json({
            message: "deleted",
            note: {
                id: note._id,
                title: note.title,
                content: note.content,
                userId: note.userId,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
            },
        });
    } catch (error) {
        const status = error.message === "Note not found" ? 404 : 403;
        return errorResponse(res, error.message, status);
    }
})

//paginateNotes
noteRouter.get("/paginate-sort", async (req, res) => {
   const notes =await noteService.paginateNotes({
    userId: req.query.userId,
    page: req.query.page,
    limit: req.query.limit,
   });
   return res.status(200).json(
    notes.map((note) => ({
        id: note._id,
        title: note.title,
        content: note.content,
        userId: note.userId,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
    }))
);
});

//getNotesWithUser
noteRouter.get("/note-with-user", async (req, res) => {
    const notes =await noteService.getNotesWithUser({
     userId: req.query.userId,
    })
    return res.status(200).json(notes);
 
 })
 noteRouter.get("/aggregate", async (req, res) => {
    const notes = await noteService.aggregateNotes({
        userId: req.query.userId,
        title: req.query.title,
    });
    return res.status(200).json(notes);
});
//getNote
noteRouter.get("/:noteId", async (req, res) => {
    try {
        const note =await noteService.getNote({
            noteId: req.params.noteId,
            userId: req.query.userId,

        });
        return res.status(200).json({
            id: note._id,
            title: note.title,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        });
    } catch (error) {
        const status = error.message === "Note not found" ? 404 : 403;
        return errorResponse(res, error.message, status);
    }
})

//deleteNotesByUser
noteRouter.delete("/", async (req, res) => {
    try {
        await noteService.deleteNotesByUser({ userId: req.query.userId });
        return successResponse(res, "Deleted");
    } catch (error) {
        return errorResponse(res, error.message);
    }
});
