import React from 'react';
import Logo from "../../../asset/resource/aeon.png";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';

export interface ConfirmDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    onConfirm?: () => void;
    text1: string
    text2: string

}

export default function ConfirmDialog({ open, setOpen, onClose, onConfirm, text1, text2 }: ConfirmDialogProps) {
    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                className: "p-4 rounded-lg",
                style: { borderRadius: 16 },
            }}
        >
            <DialogTitle>
                <Box className="flex flex-col items-center">
                    <img src={Logo} alt="logo" width={80} height={80} />
                </Box>
            </DialogTitle>

            <DialogContent className='flex flex-col items-center justify-center'>
                <Typography align="center" variant="body1" className="mb-2">
                    {text1}
                </Typography>
                <Typography align="center" variant="body1">
                    {text2}
                </Typography>
                <Button
                    variant="contained"
                    onClick={onConfirm}
                    sx={{
                        backgroundColor: "#e464bc",
                        '&:hover': {
                            backgroundColor: "#c3399a",
                        },
                        '&:focus': {
                            backgroundColor: "#b63383",
                        },
                        textTransform: 'none',
                        fontSize: "0.9rem",
                        px: 4,
                        mt: 4
                    }}
                >
                    Xác nhận
                </Button>
            </DialogContent>
        </Dialog>
    );
}
