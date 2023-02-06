/*******************TEST CODE*******************

select * from dbo.Files

DECLARE @IsDeleted = 0
		,@Id int = 5

	

EXECUTE [dbo].[Files_UpdateDeleteStatus]
		@IsDeleted
		,@Id



***********************************************/
Create PROC [dbo].[Files_UpdateDeleteStatus]
			@IsDeleted bit
			,@Id int OUTPUT

AS

	--Files Update

BEGIN
	UPDATE [dbo].[Files]
		SET [IsDeleted] = @IsDeleted
		WHERE Id = @Id
		 
END
GO
